package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.*;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectRESTController {

    @Autowired
    private ProjectManager projectManager;

    @Autowired
    private ProjectEntityRepository projectRepository;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private CommentEntityRepository commentEntityRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    @Autowired
    private MergeRequestDiffsVersionsRepository mergeRequestDiffVersionRepository;

    @Autowired
    private MergeRequestDiffsRepository mergeRequestDiffRepository;


    @PostMapping("/create")
    @Deprecated
    void initializeUser(@RequestParam String token) {
        this.projectManager.setProjectToken(token);
    }

//    "http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer"
    @PostMapping("/add")
    @Deprecated
    void addProject(@RequestParam String url) {
        ProjectController p = this.projectManager.getOrAddProject(url);
        this.projectRepository.save(new ProjectEntity(p.getProjectId(), p.getProjectName(), p.getNumCommits(), p.getNumMR(), p.getNumComments()));
        this.commitRepository.saveAll(p.getCommitEntities());
        this.issueRepository.saveAll(p.getIssuesEntities());
        this.commentEntityRepository.saveAll(p.getComments());
        this.mergeRequestEntityRepository.saveAll(p.getMergeRequestEntities());
        this.mergeRequestDiffVersionRepository.saveAll(p.getMRDiffVersions());
        this.mergeRequestDiffRepository.saveAll(p.getMRDiffs());
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        return this.projectRepository.findAll();
    }
    
    @GetMapping("/{projectId}")
    String getProjectName(@PathVariable(value="projectId") int projectId) {
        return this.projectRepository.findProjectName(projectId);
    }

    @PostMapping("/{projectId}/load")
    void load(@PathVariable() int projectId) {
        this.projectManager.findProject(projectId)
                .map(ProjectController::load)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @GetMapping("/{projectId}/overview")
    List<?> getProjectOverview(@PathVariable(value="projectId") int projectId) {
        return this.mergeRequestEntityRepository.findContributions(projectId);
    }

    @GetMapping("/{projectId}/members")
    List<String> getProjectMembers(@PathVariable(value="projectId") int projectId) {
        ProjectController projectController = this.projectManager.findProject(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return projectController.getMembers();
    }

    @GetMapping("/{projectId}/merge_requests")
    Iterable<MergeRequestEntity> getProjectMergeRequests(@PathVariable(value="projectId") int projectId) {
        return this.mergeRequestEntityRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/commits")
    Iterable<CommitEntity> getProjectCommits(@PathVariable(value="projectId") int projectId) {
        return this.commitRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/issues")
    Iterable<IssueEntity> getProjectIssues(@PathVariable(value="projectId") int projectId) {
        return this.issueRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/merge_requests/{merge_request_iid}/versions")
    Iterable<MergeRequestDiffVersionsEntity> getMergeRequestDiffVersions(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid) {
        return this.mergeRequestDiffVersionRepository.findAllByProjectIdAndMRIid(projectId, MRIid);
    }

    @GetMapping("/{projectId}/merge_requests/{merge_request_iid}/versions/{version_id}")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffVersions(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid, @PathVariable(value = "version_id") int versionId) {
        return this.mergeRequestDiffRepository.findAllByProjectIdAndMRIidAndVersionId(projectId, MRIid, versionId);
    }

    @GetMapping("/{projectId}/{MRorIssueId}/comments")
    Iterable<CommentEntity> getProjectComments(@PathVariable(value="projectId") int projectId, @PathVariable(value="MRorIssueId") int MRorIssueId) {
        return this.commentEntityRepository.findAllByProjectIdAndMRorIssueId(projectId,MRorIssueId);
    }
}