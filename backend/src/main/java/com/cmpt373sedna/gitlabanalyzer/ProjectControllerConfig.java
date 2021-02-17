package com.cmpt373sedna.gitlabanalyzer;

import com.cmpt373sedna.gitlabanalyzer.controllers.Extractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProjectControllerConfig {

    @Bean
    public Extractor extractor() {
        return new Extractor();
    }
}
