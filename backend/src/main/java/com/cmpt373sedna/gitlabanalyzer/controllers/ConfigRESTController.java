package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/config")
public class ConfigRESTController {
    @Autowired
    private ConfigEntityRepository configEntityRepository;

    @PostMapping("/")
    public ConfigEntity create(@RequestBody ConfigEntity body) {
        return configEntityRepository.save(body);
    }

    @GetMapping("/")
    public Iterable<ConfigEntity> getAll() {
        return configEntityRepository.findAll();
    }

    @GetMapping("/{configId}")
    public ConfigEntity get(@PathVariable String configId) {
        return configEntityRepository.findById(configId).orElse(null);
    }

    @PostMapping("/{configId}/load")
    public ConfigEntity loadConfig(@PathVariable String configId) {
        ConfigEntity config = configEntityRepository.findById(configId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
