package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.controllers.Extractor;
import com.cmpt373sedna.gitlabanalyzer.model.CodeContributionHistory;
import com.cmpt373sedna.gitlabanalyzer.repository.CodeContributionRepository;
import lombok.Getter;
import org.apache.catalina.Store;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;

public class CodeContributionController {
    final private int contributionID;

    private int[] weights;

    final private Extractor e;

    private List<JSONObject> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    @Autowired
    private CodeContributionHistory codeContribution;
    private CodeContributionRepository contributionRepository;

    public CodeContributionController(String url) {
        this.e = new Extractor();
        String[] links = this.e.getBasicRepoLinks();

        // 0: id.toString(), 1:mergeRequestLink, 2:issuesLink, 3:repoBranchesLink
        this.contributionID = Integer.parseInt(links[0]);
        this.mergeRequests =  this.e.getMergeRequests(links[0]);
        this.issues = this.e.getIssues(links[0]);
        this.commits = this.e.getCommits(url + this.contributionID);

        this.weights = new int[]{1, 1, 1};
    }

    @PostConstruct
    private void postConstructor() {
        this.contributionRepository.save(new CodeContributionHistory(contributionID, getNumCommits(), getNumMR(), getNumComments()));
    }

    public int getNumCommits(){
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
}


