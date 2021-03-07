package com.cmpt373sedna.gitlabanalyzer.controllers;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProjectManager {
    private @Getter List<ProjectController> allProjects;
    private @Getter List<ProjectController> selectedProjects;
    final private Extractor e;
    private @Setter  String projectToken;

    public ProjectManager() {
        this.e = new Extractor();
        this.allProjects = new ArrayList<>();
        this.selectedProjects = new ArrayList<>();
    }

    public void addProjects(List<String> urls) {
        for (String url: urls) {
            addProject(url);
        }
    }

    public ProjectController addProject(String url) {
        ProjectController p = new ProjectController(this.e, url, this.projectToken);
        allProjects.add(p);
        return p;
    }

    public void selectProjects(List<String> selectedProjects) {
        for (String projectName: selectedProjects) {
            selectProject(projectName);
        }
    }

    public void selectProject(String projectName) {
        for (ProjectController project: allProjects) {
            if (project.getProjectName().equals(projectName)) {
                selectedProjects.add(project);
                return;
            }
        }
    }
}
