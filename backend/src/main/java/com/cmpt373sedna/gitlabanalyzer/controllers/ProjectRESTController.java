package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.json.JSONObject;
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

    @PostMapping("/create")
    void initializeUser(@RequestParam String token) {
        System.out.println();
        this.projectManager = new ProjectManager(token);
    }

//    "http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer"
    @PostMapping("/add")
    void addProject(@RequestParam String url) {
        ProjectController p = this.projectManager.addProject(url);
        this.projectRepository.save(new ProjectEntity(p.getProjectId(), p.getProjectName(), p.getNumCommits(), p.getNumMR(), p.getNumComments()));
        this.commitRepository.saveAll(p.getCommitEntities());
        this.issueRepository.saveAll(p.getIssues());
        this.mergeRequestEntityRepository.saveAll(p.getMergeRequestEntities());
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        Iterable<ProjectEntity> p = this.projectRepository.findAll();
        return this.projectRepository.findAll();
    }

    @GetMapping("/{projectId}/overview")
    Iterable<JSONObject> getProjectOverview(@PathVariable(value="projectId") int projectId) {
        Iterable<MergeRequestEntity> mergeRequestEntities = this.mergeRequestEntityRepository.findAllByProjectId(projectId);
        Iterable<CommitEntity> commitEntities = this.commitRepository.findAllByProjectId(projectId);
        return null;
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
}