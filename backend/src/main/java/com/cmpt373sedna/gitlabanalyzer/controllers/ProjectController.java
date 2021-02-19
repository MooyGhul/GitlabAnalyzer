package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.*;
import lombok.Getter;
import org.json.JSONObject;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectController {

    final private @Getter int projectId;

    final private @Getter String projectName;

    final private Extractor e;

    final private String url;

    final private String projectToken;

    private int[] weights;

    private @Getter List<MergeRequestEntity> mergeRequestEntities;

    private @Getter List<IssueEntity> issues;

    private @Getter List<CommitEntity> commitEntities;

//    private @Getter List<CodeContributionHistory> contributionHistories;

    private @Getter List<String> members;

    public ProjectController(Extractor e, String url, String projectToken) {
        this.e = e;
        this.projectToken = projectToken;
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = this.e.getBasicRepoLinks(url, projectToken);

        this.projectId = Integer.parseInt(links[0]);
        this.projectName = links[1];
        this.url = links[2];
        this.mergeRequestEntities = this.getAndParseMergeRequests(links[3]);
        this.issues = this.getAndParseIssues(links[4]);
//        this.contributionHistories = this.getContributionHistories();
        this.members = this.e.getRepoMembers(links[6], this.projectToken);
        this.commitEntities = this.getAndParseCommits();

        this.weights = new int[]{1, 1, 1, 1};
    }

    private List<IssueEntity> getAndParseIssues(String url) {
        List<JSONObject> issues = this.e.getIssues(url, this.projectToken);
        return issues.stream().map(IssueEntity::fromGitlabJSON).collect(Collectors.toList());
    }
    private List<CommitEntity> getAndParseCommits() {
        List<JSONObject> commits = this.e.getCommits(this.url, this.projectToken);
        commits.forEach(commit -> commit.put("project_id", this.projectId));
        return commits.stream().map(CommitEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestEntity> getAndParseMergeRequests(String url) {
        List<JSONObject> mergeRequests = e.getMergeRequests(url, this.projectToken);
        return mergeRequests.stream().map(MergeRequestEntity::fromGitlabJSON).collect(Collectors.toList());
    }

//    private List<CodeContributionHistory> getCodeContributions() {
//        int mrCount = 0;
//        int commitCount = 0;
//        for(MergeRequestEntity mr: this.mergeRequestEntities) {
//            for(CommitEntity commit : this.commitEntities) {
//                if(mr.getMergedAt() == commit.getCommitDate()) {
//                    commitCount++;
//                }
//            }
//        }
//    }

    public int getNumCommits() {
        return this.commitEntities.size();
    }

    public int getNumMR() {
        return this.mergeRequestEntities.size();
    }

    public int getNumComments() {
        int sum = 0;

        for(IssueEntity issue: this.issues) {
            String url = this.url + "/issues/" + issue.getIssueIid() + "/notes";
            List<JSONObject> issueComments = this.e.getIssueComments(url, this.projectToken);
            sum += issueComments.size();
        }

        for(MergeRequestEntity mr: this.mergeRequestEntities) {
            String url =  this.url + "/merge_requests/" + mr.getIid();
            List<JSONObject> mrComments = this.e.getMergeRequestComments(url, this.projectToken);
            sum += mrComments.size();
        }

        return sum;
    }

    public int getNumIssues() {
        return this.issues.size();
    }
}
