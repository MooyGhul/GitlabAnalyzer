package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.HelloWorld;
import com.cmpt373sedna.gitlabanalyzer.repository.HelloWorldRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(SpringExtension.class) // required for every test class
class HelloWorldControllerTest {
    @Mock
    private HelloWorldRepository helloWorldRepository;

    @InjectMocks
    private HelloWorldController helloWorldController;

    @Test
    void helloWorld_returns_hello_world() {
        when(helloWorldRepository.findById("hello")).thenReturn(Optional.of(HelloWorld.builder()
                .hello("hello")
                .world("world")
                .build()));
        assertEquals(helloWorldController.helloWorld(), "helloworld");
    }
}