package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/project")
public class ProjectRESTController {

    private ProjectManager projectManager;

    @Autowired
    private ProjectEntityRepository projectRepository;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    @Autowired
    private MergeRequestDiffsVersionsRepository mergeRequestDiffVersionRepository;

    @Autowired
    private MergeRequestDiffsRepository mergeRequestDiffRepository;

    @PostMapping("/create")
    void initializeUser(@RequestParam String token) {
        this.projectManager = new ProjectManager(token);
    }

//    "http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer"
    @PostMapping("/add")
    void addProject(@RequestParam String url) {
        ProjectController p = this.projectManager.addProject(url);
        this.projectRepository.save(new ProjectEntity(p.getProjectId(), p.getProjectName(), p.getNumCommits(), p.getNumMR(), p.getNumComments()));
        this.commitRepository.saveAll(p.getCommitEntities());
        this.issueRepository.saveAll(p.getIssuesEntities());
        this.mergeRequestEntityRepository.saveAll(p.getMergeRequestEntities());
        this.mergeRequestDiffVersionRepository.saveAll(p.getMRDiffVersions());
        this.mergeRequestDiffRepository.saveAll(p.getMRDiffs());
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        Iterable<ProjectEntity> p = this.projectRepository.findAll();
        return this.projectRepository.findAll();
    }

    @GetMapping("/{projectId}/overview")
    List<?> getProjectOverview(@PathVariable(value="projectId") int projectId) {
        return this.mergeRequestEntityRepository.findContributions(projectId);
    }

    @GetMapping("/{projectId}/members")
    List<String> getProjectMembers(@PathVariable(value="projectId") int projectId) {
        Optional<ProjectEntity> selectedProject = this.projectRepository.findById(projectId);
        if(selectedProject.isPresent()) {
            this.projectManager.selectProject(selectedProject.get().getRepoName());
            ProjectController p = this.projectManager.getSelectedProjects().get(0);
            return p.getMembers();
        }
        return null;
    }

    @GetMapping("/{projectId}/merge_requests")
    Iterable<MergeRequestEntity> getProjectMergeRequests(@PathVariable(value="projectId") int projectId) {
        Iterable<MergeRequestEntity> m = this.mergeRequestEntityRepository.findAllByProjectId(projectId);
        return this.mergeRequestEntityRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/commits")
    Iterable<CommitEntity> getProjectCommits(@PathVariable(value="projectId") int projectId) {
        Iterable<CommitEntity> m = this.commitRepository.findAllByProjectId(projectId);
        return this.commitRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/merge_requests/{merge_request_iid}/versions")
    Iterable<MergeRequestDiffVersionsEntity> getMergeRequestDiffVersions(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid) {
        Iterable<MergeRequestDiffVersionsEntity> m = this.mergeRequestDiffVersionRepository.findAllByProjectIdAndMRIid(projectId, MRIid);
        return this.mergeRequestDiffVersionRepository.findAllByProjectIdAndMRIid(projectId, MRIid);
    }

    @GetMapping("/{projectId}/merge_requests/{merge_request_iid}/versions/{version_id}")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffs(@PathVariable(value = "projectId"+"merge_request_iid") String projectId, @PathVariable(value = "version_id") int versionId) {
        Iterable<MergeRequestDiffsEntity> m = this.mergeRequestDiffRepository.findAllByMRIidandversionID(projectId, versionId);
        return this.mergeRequestDiffRepository.findAllByMRIidandversionID(projectId, versionId);
    }
}