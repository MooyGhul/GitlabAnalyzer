package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.repository.CodeContributionRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CodeContributionController {
    final private int contributionID;

    private int[] weights;

    final private Extractor e;

    private List<JSONObject> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    public CodeContributionController(String url, String token) {
        this.e = new Extractor();
        String[] links = this.e.getBasicRepoLinks(url, token);

        // 0: id.toString(), 1:mergeRequestLink, 2:issuesLink, 3:repoBranchesLink
        this.contributionID = Integer.parseInt(links[0]);
        this.mergeRequests =  this.e.getMergeRequests(links[0], token);
        this.issues = this.e.getIssues(links[0], token);
        this.commits = this.e.getCommits(url + this.contributionID, token);

        this.weights = new int[]{1, 1, 1};
    }

    public int getNumCommits(){
        return this.commits.size();
    }
    public int getNumMR() {
        return this.mergeRequests.size();
    }

    public int getNumComments(String token) {
        int sum = 0;

        for(JSONObject issue: this.issues) {
            JSONObject links = (JSONObject) issue.get("_links");
            String issueNotesLink = (String) links.get("notes");
            List<JSONObject> issueComments = this.e.getIssueComments(issueNotesLink, token);
            sum += issueComments.size();
        }

        for(JSONObject mr: this.mergeRequests) {
            int mrId = (Integer) mr.get("iid");
            List<JSONObject> mrComments = this.e.getMergeRequestComments(Integer.toString(mrId), token);
            sum += mrComments.size();
        }

        return sum;
    }
}


