package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

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
        //this.mergeRequestDiffVersionRepository.saveAll(p.getMRDiffVersions());
        //this.mergeRequestDiffRepository.saveAll(p.getMRDiffs());
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        return this.projectRepository.findAll();
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


    @GetMapping("/{projectId}/issues")
    Iterable<IssueEntity> getProjectIssues(@PathVariable(value="projectId") int projectId) {
        return this.issueRepository.findAllByProjectId(projectId);
    }
}