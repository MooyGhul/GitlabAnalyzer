package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.IssueEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/project")
public class RESTController {

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

    @PostMapping("/add")
    void addProject() {
        this.projectManager.addProject("http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer");
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        return this.projectRepository.findAll();
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
        return this.mergeRequestEntityRepository.findAll();
    }

    @GetMapping("/{projectId}/commits")
    Iterable<CommitEntity> getProjectCommits(@PathVariable(value="projectId") int projectId) {
        return this.commitRepository.findAll();
    }

    @GetMapping("/{projectId}")
    JSONObject getProject(@PathVariable(value="projectId") int projectId, @RequestParam String startDate,
                                       @RequestParam String endDate) {

        Iterable<ProjectEntity> project = this.projectRepository.findAll();
        Iterable<CommitEntity> commits = this.commitRepository.findAll();

        JSONObject returnObj = new JSONObject();
        returnObj.put("project", project);
//        returnObj.put("members", selectedProject.getMembers());
        returnObj.put("commits", commits);
        return returnObj;
    }
}
