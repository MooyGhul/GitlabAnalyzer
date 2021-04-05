package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.WeightConfigurationEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IterationConfigurationEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.WeightConfigurationEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.IterationConfigurationRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/configuration")
public class ConfigurationEntityController {

    @Autowired
    private WeightConfigurationEntityRepository weightConfigurationEntityRepository;

    @Autowired
    private IterationConfigurationRepository iterationConfigurationRepository;

    @GetMapping("/iterations/all")
    public Iterable<IterationConfigurationEntity> getAllIterations() {
        return this.iterationConfigurationRepository.findAll();
    }

    @GetMapping("/weights/all")
    public Iterable<WeightConfigurationEntity> getAllWeights() {
        return this.weightConfigurationEntityRepository.findAll();
    }

    @PostMapping("/newIterationConfig")
    public void createNewIteration(@RequestBody IterationConfigurationEntity body) {
        this.iterationConfigurationRepository.save(body);
    }

    @PostMapping("/newWeightConfig")
    public void createNewWeightConfig(@RequestBody String body) {
        JSONObject obj = new JSONObject(body);
        this.weightConfigurationEntityRepository.save(WeightConfigurationEntity.fromGitlabJSON(obj));
    }

    @GetMapping("/get/iterations/{token}")
    public Iterable<IterationConfigurationEntity> getIterationConfigurations(@PathVariable String token) {
        return this.iterationConfigurationRepository.findAllByToken(token);
    }

    @GetMapping("/get/weightScores/{token}")
    public Iterable<WeightConfigurationEntity> getScoreConfigurations(@PathVariable String token) {
        return this.weightConfigurationEntityRepository.findAllByToken(token);
    }
}
