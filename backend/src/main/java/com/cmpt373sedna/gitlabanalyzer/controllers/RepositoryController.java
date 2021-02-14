package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.json.JSONObject;
import java.util.List;

public class RepositoryController {

    final private int repoId;

    final private String repoName;

    final private Extractor e;

    private int[] weights;

    private List<JSONObject> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    public RepositoryController(String url) {
        this.e = new Extractor();
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = this.e.getBasicRepoLinks();

        this.repoId = Integer.parseInt(links[0]);
        this.repoName = links[1];
        this.mergeRequests = this.e.getMergeRequests(links[2]);
        this.issues = this.e.getIssues(links[3]);
        this.members = this.e.getRepoMembers(links[5]);
        this.commits = this.e.getCommits(url + this.repoId);

        this.weights = new int[]{1, 1, 1, 1};
    }

    public int getNumCommits() {
        return this.commits.size();
    }

    public int getNumMR() {
        return this.mergeRequests.size();
    }

    public int getNumComments() {
        int sum = 0;

        for(JSONObject issue: this.issues) {
            JSONObject links = (JSONObject) issue.get("_links");
            String issueNotesLink = (String) links.get("notes");
            List<JSONObject> issueComments = this.e.getIssueComments(issueNotesLink);
            sum += issueComments.size();
        }

        for(JSONObject mr: this.mergeRequests) {
            int mrId = (Integer) mr.get("iid");
            List<JSONObject> mrComments = this.e.getMergeRequestComments(Integer.toString(mrId));
            sum += mrComments.size();
        }

        return sum;
    }

    public int getNumIssues() {
        return this.issues.size();
    }

    public List<String> getMembers() {
        return members;
    }
}
