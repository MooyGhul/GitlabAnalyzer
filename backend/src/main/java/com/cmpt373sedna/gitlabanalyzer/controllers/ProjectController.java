package com.cmpt373sedna.gitlabanalyzer.controllers;


import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import com.cmpt373sedna.gitlabanalyzer.model.CommentEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import lombok.Getter;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectController {

    final private @Getter int projectId;

    final private @Getter String projectName;

    final private Extractor e;

    final private String url;

    final private String projectToken;

    private int[] weights;

    private int totalComments;

    private @Getter List<MergeRequestEntity> mergeRequestEntities;

    private @Getter List<IssueEntity> issuesEntities;

    private @Getter List<CommentEntity> comments;

    private @Getter List<CommitEntity> commitEntities;

    private @Getter List<MergeRequestDiffVersionsEntity> MRDiffVersions;

    private @Getter List<MergeRequestDiffsEntity> MRDiffs;

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
        this.issuesEntities = this.getAndParseIssues(links[4]);
        this.members = this.e.getRepoMembers(links[6], this.projectToken);
        this.comments = this.getAndParseComments();
        this.commitEntities = this.getAndParseCommits();
        this.MRDiffVersions = this.getAndParseMergeRequestsDiffVersions(links[3]);
        this.MRDiffs = this.getAndParseMergeRequestsDiffs(links[3]);

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

    private List<CommentEntity> getAndParseComments() {
        List<JSONObject> comments = new ArrayList<>();
        for(IssueEntity issue: this.issuesEntities) {
            String url = this.url + "/issues/" + issue.getIssueId() + "/notes";
            List<JSONObject> issueComments = this.e.getIssueComments(url, this.projectToken);
            comments.addAll(issueComments);
        }

        for(MergeRequestEntity mr: this.mergeRequestEntities) {
            String url =  this.url + "/merge_requests/" + mr.getIid();
            List<JSONObject> mrComments = this.e.getMergeRequestComments(url, this.projectToken);
            comments.addAll(mrComments);
        }

        return comments.stream().map(CommentEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestDiffVersionsEntity> getAndParseMergeRequestsDiffVersions(String url) {
        List<JSONObject> mergeRequestsDiffVersions = e.getMergeRequestsDiff(url, this.projectToken);
        return mergeRequestsDiffVersions.stream().map(MergeRequestDiffVersionsEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestDiffsEntity> getAndParseMergeRequestsDiffs(String url) {
        List<JSONObject> mergeRequestsDiffs = e.getMergeRequestsDiffChanges(url, this.projectToken);
        return mergeRequestsDiffs.stream().map(MergeRequestDiffsEntity::fromGitlabJSON).collect(Collectors.toList());
    }


    public int getNumCommits() {
        return this.commitEntities.size();
    }

    public int getNumMR() {
        return this.mergeRequestEntities.size();
    }

    public int getNumComments() {
        return this.comments.size();
    }

    public int getNumIssues() {
        return this.issuesEntities.size();
    }
}
