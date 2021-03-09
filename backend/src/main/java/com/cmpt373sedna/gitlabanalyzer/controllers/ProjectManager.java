package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.IssueEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestEntityRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProjectManager {
    private @Getter List<ProjectController> allProjects;
    private @Getter List<ProjectController> selectedProjects;
    final private Extractor e;
    private @Setter  String projectToken;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

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

    public ProjectController loadProject(ConfigEntity config, ProjectEntity project) {
        Optional<ProjectController> existing = this.allProjects.stream()
                .filter(controller -> controller.getProjectId() == project.getRepoId())
                .findFirst();

        if (existing.isPresent()) {
            return existing.get();
        }

        ProjectController projectController = new ProjectController(this.e, config, project);
        allProjects.add(projectController);

        this.commitRepository.saveAll(projectController.getCommitEntities());
        this.issueRepository.saveAll(projectController.getIssuesEntities());
        this.mergeRequestEntityRepository.saveAll(projectController.getMergeRequestEntities());

        return projectController;
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
