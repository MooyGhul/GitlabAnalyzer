package com.cmpt373sedna.gitlabanalyzer.controllers;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class ProjectManager {
    private @Getter List<ProjectController> allProjects;
    private @Getter List<ProjectController> selectedProjects;

    public ProjectManager() {
        this.allProjects = new ArrayList<ProjectController>();
        this.selectedProjects = new ArrayList<ProjectController>();
    }

    void addProjects(List<String> urls) {
        for (String url: urls) {
            addProject(url);
        }
    }

    void addProject(String url) {
        allProjects.add(new ProjectController(url));
    }

    void selectProjects(List<String> selectedProjects) {
        for (String projectName: selectedProjects) {
            selectProject(projectName);
        }
    }

    void selectProject(String projectName) {
        for (ProjectController project: allProjects) {
            if (project.getProjectName().equals(projectName)) {
                selectedProjects.add(project);
                return;
            }
        }
    }
}
