package com.cmpt373sedna.gitlabanalyzer;

import com.cmpt373sedna.gitlabanalyzer.model.Repository;
import org.json.JSONObject;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

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
//            ArrayList<String> members = repo.getMembers();
//            ArrayList<JSONObject> mergeRequests = repo.getMergeRequests();
//            ArrayList<JSONObject> issues = repo.getIssues();
            ArrayList<JSONObject> branches = repo.getBranches();

//            members.forEach(System.out::println);
//            mergeRequests.forEach(System.out::println);
//            issues.forEach(System.out::println);
            branches.forEach(System.out::println);
        };
    }
}