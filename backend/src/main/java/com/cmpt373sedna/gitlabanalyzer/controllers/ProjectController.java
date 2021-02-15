package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequest;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import lombok.Getter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectController {

    final private int projectId;

    final private @Getter String projectName;

    final private Extractor e;

    final private String url;

    final private String projectToken;

    private int[] weights;

    private List<MergeRequest> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    @Autowired
    private ProjectEntityRepository projectRepository;

    @Autowired
    private MergeRequestRepository mergeRequestRepository;

    public ProjectController(Extractor e, String url, String projectToken) {
        this.e = e;
        this.projectToken = projectToken;
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = this.e.getBasicRepoLinks(url, projectToken);

        this.projectId = Integer.parseInt(links[0]);
        this.projectName = links[1];
        this.url = links[2];
        this.mergeRequests = this.getAndParseMergeRequests(links[3]);
        this.issues = this.e.getIssues(links[4], this.projectToken);
        this.members = this.e.getRepoMembers(links[6], this.projectToken);
        this.commits = this.e.getCommits(this.url, this.projectToken);

        this.weights = new int[]{1, 1, 1, 1};
    }

    private List<MergeRequest> getAndParseMergeRequests(String url) {
        List<JSONObject> mergeRequests = e.getMergeRequests(url, this.projectToken);

        return mergeRequests.stream().map(MergeRequest::fromGitlabJSON).collect(Collectors.toList());
    }

    //projectRepository is not initialized until AFTER the constructor has been run
    //so the Project has to be added to the repo after the constructor has been initialized
    @PostConstruct
    private void postConstructor() {
        this.projectRepository.save(new ProjectEntity(projectId, projectName, getNumCommits(), getNumMR(), getNumComments()));

        this.mergeRequestRepository.saveAll(mergeRequests);
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

        for(MergeRequest mr: this.mergeRequests) {
            String url =  this.url + "/merge_requests/" + mr.getIid();
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
