package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@WebMvcTest
class HelloWorldControllerTest {
    @InjectMocks
    private HelloWorldController helloWorldController;

    @Test
    void helloWorld_returns_hello_world() {
        assertEquals(helloWorldController.helloWorld(), "helloworld");
    }
}