package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.HelloWorld;
import com.cmpt373sedna.gitlabanalyzer.repository.HelloWorldRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
public class HelloWorldController {
    private final HelloWorldRepository repository;

    @GetMapping("/")
    public String helloWorld() {
        HelloWorld helloWorld = repository.findById("hello").orElse(null);

        if (helloWorld == null) {
            helloWorld = repository.save(HelloWorld.builder()
                    .hello("hello")
                    .world("world")
                    .build());
        }

        return helloWorld.getHello() + helloWorld.getWorld();
    }
}
