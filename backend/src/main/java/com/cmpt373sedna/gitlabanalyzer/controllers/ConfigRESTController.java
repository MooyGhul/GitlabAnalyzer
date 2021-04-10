package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/config")
public class ConfigRESTController {
    @Autowired
    private ConfigEntityRepository configEntityRepository;

    @Autowired
    private Extractor extractor;

    @Autowired
    private ProjectManager projectManager;

    @Autowired
    private ProjectEntityRepository projectEntityRepository;

    @PostMapping("/create")
    public ConfigEntity create(@RequestBody ConfigEntity body) {
        projectManager.setConfig(body);
        return this.configEntityRepository.save(body);
    }

    @GetMapping
    public Iterable<ConfigEntity> getAll() {
        return this.configEntityRepository.findAll();
    }

    @PutMapping("/{configId}")
    public ConfigEntity replace(@PathVariable String configId, @RequestBody ConfigEntity body) {
        if (!configId.equals(body.getId())) {
            throw new IllegalArgumentException("URL ID and body ID don't match");
        }
        projectManager.setConfig(body);
        return this.configEntityRepository.save(body);
    }

    @GetMapping("/{configId}")
    public ConfigEntity get(@PathVariable String configId) {
        return this.configEntityRepository.findById(configId).orElse(null);
    }

    @PostMapping("/{configId}/load")
    public List<ProjectEntity> loadConfig(@PathVariable String configId) {
        ConfigEntity config = this.configEntityRepository.findById(configId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return this.extractor.getProjects(config).stream()
                .map(project -> this.projectEntityRepository.save(project))
                .peek(project -> this.projectManager.getOrAddProject(config, project))
                .collect(Collectors.toList());
    }
}
