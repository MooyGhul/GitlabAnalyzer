package com.cmpt373sedna.gitlabanalyzer.model;

import com.cmpt373sedna.gitlabanalyzer.controllers.Extractor;

import javax.persistence.Id;
import java.util.ArrayList;

public @lombok.Data class Repository {
    private @Id String repoId;
    private String repoName;
    private int[] weights;
    private ArrayList<String> mergeRequests;
    private ArrayList<String> issues;
    private ArrayList<String> branches;
    private ArrayList<String> members;

    public Repository(String url) {
        Extractor e = new Extractor();
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = e.getBasicRepoLinks();
        this.repoId = links[0];
        this.repoName = links[1];
    }

    public String getRepoId() {
        return repoId;
    }
}
