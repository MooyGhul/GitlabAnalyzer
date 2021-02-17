package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RESTController {

    private ProjectManager projectManager;

//    @Autowired
//    private ProjectController projectController;

    @PostMapping("/create")
    void initializeUser(@RequestParam String token) {
        System.out.println();
        this.projectManager = new ProjectManager(token);
//        this.projectManager.addProject("http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer");
    }

    @PostMapping("/add")
    void addProject() {
        this.projectManager.addProject("http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer");
    }

    @GetMapping("/project/{projectName}")
    List<ProjectController> getProject(@PathVariable(value="projectName") String projectName, @RequestParam String startDate,
                                       @RequestParam String endDate) {
        this.projectManager.selectProject(projectName);
        ProjectController project = this.projectManager.getSelectedProjects().get(0);
        return this.projectManager.getSelectedProjects();
    }
}
