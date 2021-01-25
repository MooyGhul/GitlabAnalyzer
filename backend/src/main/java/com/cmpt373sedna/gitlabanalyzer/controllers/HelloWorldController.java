package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.HelloWorld;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @GetMapping("/")
    public String helloWorld() {
        HelloWorld helloWorld = HelloWorld.builder()
                .hello("hello")
                .world("world")
                .build();

        return helloWorld.getHello() + helloWorld.getWorld();
    }
}
