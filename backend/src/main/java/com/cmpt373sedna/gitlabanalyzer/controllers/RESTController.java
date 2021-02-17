package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class RESTController {

    @Autowired
    private final ProjectEntityRepository projectEntityRepository;

    public RESTController(ProjectEntityRepository projectEntityRepository) {
        this.projectEntityRepository = projectEntityRepository;
    }

    @GetMapping("/url")
    Iterable<ProjectEntity> all() {
        System.out.println("HELLO");
        return projectEntityRepository.findAll();
    }
}
