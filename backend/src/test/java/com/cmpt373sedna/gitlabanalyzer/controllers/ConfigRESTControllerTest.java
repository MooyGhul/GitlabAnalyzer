package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

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
    }

    @Test
    void getAll() {
    }

    @Test
    void replace() {
    }

    @Test
    void get() {
    }

    @Test
    void loadConfig() {
    }
}