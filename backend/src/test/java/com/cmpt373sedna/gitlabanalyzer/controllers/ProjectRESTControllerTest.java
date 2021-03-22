package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class ProjectRESTControllerTest {
    @Mock
    private ProjectManager projectManager;

    @Mock
    private ProjectController projectController;

    @InjectMocks
    private ProjectRESTController projectRESTController;

    @Test
    void getProjectMembers_throws_on_missing_project() {
        when(projectManager.findProject(5)).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> projectRESTController.getProjectMembers(5));
    }

    @Test
    void getProjectMembers_returns_project_members() {
        List<String> expected = asList("member1", "member2");
        when(projectManager.findProject(5)).thenReturn(Optional.of(projectController));
        when(projectController.getMembers()).thenReturn(expected);

        List<String> result = projectRESTController.getProjectMembers(5);
        assertEquals(expected, result);
    }
}