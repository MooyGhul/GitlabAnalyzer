package com.cmpt373sedna.gitlabanalyzer.model;
import com.cmpt373sedna.gitlabanalyzer.controllers.Extractor;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.Id;
import java.util.ArrayList;

public @lombok.Data class Repository {
    private @Id String repoId;
    private String repoName;
    private int[] weights;
    private ArrayList<JSONObject> mergeRequests;
    private ArrayList<JSONObject> issues;
    private ArrayList<JSONObject> branches;
    private ArrayList<String> members;

    public Repository(String url) {
        this.mergeRequests = new ArrayList<>();
        this.issues = new ArrayList<>();
        this.branches = new ArrayList<>();
        this.members = new ArrayList<>();

        Extractor e = new Extractor();
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = e.getBasicRepoLinks();
        this.repoId = links[0];
        this.repoName = links[1];

        JSONArray jsonMergeRequests = e.getMergeRequests(links[2]);
        jsonMergeRequests.forEach(mr -> this.mergeRequests.add((JSONObject) mr));

        JSONArray jsonIssues = e.getIssues(links[3]);
        jsonIssues.forEach(issue -> this.issues.add((JSONObject) issue));

        JSONArray jsonBranches = e.getBranches(links[4]);
        jsonBranches.forEach(branch -> this.branches.add((JSONObject) branch));

        JSONArray jsonMembers = e.getRepoMembers(links[5]);
        jsonMembers.forEach(member -> {
            JSONObject obj = (JSONObject) member;
            this.members.add((String) obj.get("username"));
        });

    }

    public ArrayList<JSONObject> getMergeRequests() {
        return mergeRequests;
    }

    public ArrayList<JSONObject> getIssues() {
        return issues;
    }

    public ArrayList<JSONObject> getBranches() {
        return branches;
    }

    public ArrayList<String> getMembers() {
        return members;
    }
}
