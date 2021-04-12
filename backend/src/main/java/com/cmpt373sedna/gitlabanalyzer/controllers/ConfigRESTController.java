package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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

    @GetMapping("/all")
    public Iterable<ConfigEntity> getAll() {
        return this.configEntityRepository.findAll();
    }

    @PostMapping("/{token}/load")
    public List<ProjectEntity> loadConfig(@PathVariable(value="token") String token) {
        ConfigEntity config = this.configEntityRepository.findByToken(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        System.out.println("***************Point1\n*********************\n********************\n");
        //List<ProjectEntity> projectsFromGitlab = projectsJSON.stream().map(ProjectEntity::fromGitlabJSON).collect(Collectors.toList());
        List<ProjectEntity> projectsFromGitlab = ProjectEntity.fromGitlabJSONList(this.extractor.getProjects(config));
        System.out.println("***************Point2\n*********************\n********************\n");
        Iterable<ProjectEntity> projectsInDb = projectEntityRepository.findAll();
        System.out.println("***************Point3\n*********************\n********************\n");
        List<ProjectEntity> projectsToSave = new ArrayList<>();
        System.out.println("***************Point4\n*********************\n********************\n");
        boolean sameId = false;
        for(ProjectEntity peGL: projectsFromGitlab) {
            for (ProjectEntity peDB : projectsInDb) {
                if (peGL.getRepoId() == peDB.getRepoId()) {
                    sameId = true;
                }
            }
            if (!sameId) {
                projectsToSave.add(peGL);
            }
            sameId = false;
        }
        System.out.println("***************Point5\n*********************\n********************\n");
        return projectsToSave.stream()
                .map(project -> this.projectEntityRepository.save(project))
                .peek(project -> this.projectManager.getOrAddProject(config, project))
                .collect(Collectors.toList());
    }
}
