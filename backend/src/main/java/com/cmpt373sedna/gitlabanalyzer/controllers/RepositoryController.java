package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.json.JSONObject;
import java.util.List;

public class RepositoryController {

    final private int repoId;

    final private String repoName;

    final private String url;

    private String projectToken; // Project Token for test server gitlabanalyzer: 1yB6tptaz_s214mAdksh

    final private Extractor e;

    private int[] weights;

    private List<JSONObject> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    public RepositoryController(Extractor e, String url, String token) {
        this.e = e;
        this.projectToken = token;
        // 0: id.toString(), 1: name, 2: rootLink, 3:mergeRequestLink, 4:issuesLink, 5:repoBranchesLink, 6:membersLink
        String[] links = this.e.getBasicRepoLinks(url, token);

        this.repoId = Integer.parseInt(links[0]);
        this.repoName = links[1];
        this.url = links[2];
        this.mergeRequests = this.e.getMergeRequests(links[3], this.projectToken);
        this.issues = this.e.getIssues(links[4], this.projectToken);
        this.members = this.e.getRepoMembers(links[6], this.projectToken);
        this.commits = this.e.getCommits(this.url, this.projectToken);

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
            List<JSONObject> issueComments = this.e.getIssueComments(issueNotesLink, this.projectToken);
            sum += issueComments.size();
        }

        for(JSONObject mr: this.mergeRequests) {
            int mrId = (Integer) mr.get("iid");
            String url =  this.url + "/merge_requests/" + mrId;
            List<JSONObject> mrComments = this.e.getMergeRequestComments(url, this.projectToken);
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
