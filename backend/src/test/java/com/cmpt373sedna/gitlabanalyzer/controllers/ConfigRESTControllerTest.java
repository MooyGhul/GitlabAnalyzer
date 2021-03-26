package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class ConfigRESTControllerTest {
    @Mock
    private ConfigEntityRepository configEntityRepository;

    @Mock
    private Extractor extractor;

    @Mock
    private ProjectManager projectManager;

    @Mock
    private ProjectEntityRepository projectEntityRepository;

    @InjectMocks
    private ConfigRESTController configRESTController;

    @Test
    void canCreateConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().name("test0").build();

        configRESTController.create(configEntity);

        verify(configEntityRepository, times(1)).save(configEntity);
    }

    @Test
    void canGetAllConfigs() {
        List<ConfigEntity> configs = asList(
                ConfigEntity.builder().name("test1").build(),
                ConfigEntity.builder().name("test2").build()
        );

        when(configEntityRepository.findAll()).thenReturn(configs);

        assertEquals(configs, configRESTController.getAll());
    }

    @Test
    void canReplaceConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().id("configId").name("test0").build();

        configRESTController.replace("configId", configEntity);

        verify(configEntityRepository, times(1)).save(configEntity);
    }

    @Test
    void canGetConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().id("configId").name("test0").build();

        when(configEntityRepository.findById("configId")).thenReturn(Optional.of(configEntity));

        assertEquals(configEntity, configRESTController.get("configId"));
    }

    @Test
    void canLoadConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().id("configId").name("test0").build();
        ProjectEntity projectEntity = ProjectEntity.builder().repoId(6).build();

        when(configEntityRepository.findById("configId")).thenReturn(Optional.of(configEntity));
        when(extractor.getProjects(configEntity)).thenReturn(Collections.singletonList(projectEntity));
        when(projectEntityRepository.save(projectEntity)).thenReturn(projectEntity);

        List<ProjectEntity> result = configRESTController.loadConfig("configId");

        assertEquals(Collections.singletonList(projectEntity), result);
        verify(projectManager, times(1)).getOrAddProject(configEntity, projectEntity);
    }

    @Test
    void canAddWeightConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().id("configId").name("test0").build();
        ProjectEntity projectEntity = ProjectEntity.builder().repoId(6).build();

        when(configEntityRepository.findById("configId")).thenReturn(Optional.of(configEntity));
        List<String> weights = Collections.singletonList("{\"JavaScript\": 57.04,\n" +
                                                            "\"Java\": 38.67,\n" +
                                                            "\"CSS\": 2.44,\n" +
                                                            "\"HTML\": 1.42,\n" +
                                                            "\"Shell\": 0.25}");

        configEntity.setWeights(weights);

        assertEquals(configEntity.getWeights(), weights);
    }
}