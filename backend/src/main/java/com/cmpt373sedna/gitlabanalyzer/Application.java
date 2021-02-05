package com.cmpt373sedna.gitlabanalyzer;

import com.cmpt373sedna.gitlabanalyzer.model.Repository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner run() throws Exception {
        return args -> {
            String URL = "http://cmpt373-1211-14.cmpt.sfu.ca:8929/api/v4/projects/";
            Repository repo = new Repository(URL);
//            System.out.println(repo.getRepoId());
        };
    }
}