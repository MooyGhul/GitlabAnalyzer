package com.cmpt373sedna.gitlabanalyzer.controllers;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class ProjectManager {
    private @Getter List<ProjectController> allProjects;
    private @Getter List<ProjectController> selectedProjects;
    final private Extractor e;
    final private String projectToken;

    public ProjectManager(String token) {
        this.e = new Extractor();
        this.projectToken = token;
        this.allProjects = new ArrayList<>();
        this.selectedProjects = new ArrayList<>();
    }

    public void addProjects(List<String> urls) {
        for (String url: urls) {
            addProject(url);
        }
    }

    public void addProject(String url) {
        allProjects.add(new ProjectController(this.e, url, this.projectToken));
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
