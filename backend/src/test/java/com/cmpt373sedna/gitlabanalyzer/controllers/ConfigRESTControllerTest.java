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
        ConfigEntity configEntity = ConfigEntity.builder().build();

        configRESTController.create(configEntity);

        verify(configEntityRepository, times(1)).save(configEntity);
    }

    @Test
    void canGetAllConfigs() {
        List<ConfigEntity> configs = asList(
                ConfigEntity.builder().build(),
                ConfigEntity.builder().build()
        );

        when(configEntityRepository.findAll()).thenReturn(configs);

        assertEquals(configs, configRESTController.getAll());
    }

    @Test
    void canLoadConfig() {
        ConfigEntity configEntity = ConfigEntity.builder().url("configId").token("test0").build();
        ProjectEntity projectEntity = ProjectEntity.builder().repoId(6).build();

        when(configEntityRepository.findByToken("configId")).thenReturn(Optional.of(configEntity));
        when(extractor.getProjects(configEntity)).thenReturn(Collections.singletonList(projectEntity));
        when(projectEntityRepository.save(projectEntity)).thenReturn(projectEntity);

        List<ProjectEntity> result = configRESTController.loadConfig("configId");

        assertEquals(Collections.singletonList(projectEntity), result);
        verify(projectManager, times(1)).getOrAddProject(configEntity, projectEntity);
    }
}