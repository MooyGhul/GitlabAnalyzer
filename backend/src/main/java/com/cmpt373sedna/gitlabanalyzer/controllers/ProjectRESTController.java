package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
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
        return this.mergeRequestEntityRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/commits")
    Iterable<CommitEntity> getProjectCommits(@PathVariable(value="projectId") int projectId) {
        return this.commitRepository.findAllByProjectId(projectId);
    }


}