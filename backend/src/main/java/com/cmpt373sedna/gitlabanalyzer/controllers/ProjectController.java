package com.cmpt373sedna.gitlabanalyzer.controllers;



import com.cmpt373sedna.gitlabanalyzer.model.*;
import lombok.Getter;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectController {

    private @Getter int projectId;

    final private @Getter String projectName;

    private Extractor extractor;

    private ConfigEntity config;

    private int[] weights;

    private int totalComments;

    private @Getter List<MergeRequestEntity> mergeRequestEntities;

    private @Getter List<IssueEntity> issuesEntities;

    private @Getter List<CommentEntity> comments;

    private @Getter List<CommitEntity> commitEntities;

    private @Getter List<MergeRequestDiffVersionsEntity> MRDiffVersions;

    private @Getter List<MergeRequestDiffsEntity> MRDiffs;

    private @Getter List<String> members;

    public ProjectController(Extractor extractor, ConfigEntity configEntity, ProjectEntity projectEntity) {
        this.extractor = extractor;
        this.config = configEntity;

        this.projectId = projectEntity.getRepoId();
        this.projectName = projectEntity.getRepoName();

        this.weights = new int[]{1, 1, 1, 1};
    }

    public ProjectController load() {
        this.mergeRequestEntities = this.getAndParseMergeRequests();
        this.issuesEntities = this.getAndParseIssues();
        this.members = this.extractor.getRepoMembers(this.config, this.projectId);
        this.comments = this.getAndParseComments();
        this.commitEntities = this.getAndParseCommits();
        //this.MRDiffVersions = this.getAndParseMergeRequestsDiffVersions();
        //this.MRDiffs = this.getAndParseMergeRequestsDiffs();

        return this;
    }

    private List<IssueEntity> getAndParseIssues() {
        List<JSONObject> issues = this.extractor.getIssues(this.config, this.projectId);
        return issues.stream().map(IssueEntity::fromGitlabJSON).collect(Collectors.toList());
    }
    private List<CommitEntity> getAndParseCommits() {
        List<JSONObject> commits = this.extractor.getCommits(this.config, this.projectId);
        commits.forEach(commit -> commit.put("project_id", this.projectId));
        return commits.stream().map(CommitEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestEntity> getAndParseMergeRequests() {
        List<JSONObject> mergeRequests = extractor.getMergeRequests(this.config, this.projectId);
        return mergeRequests.stream().map(MergeRequestEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<CommentEntity> getAndParseComments() {
        List<JSONObject> comments = new ArrayList<>();
        for(IssueEntity issue : this.issuesEntities) {
            List<JSONObject> issueComments = this.extractor.getComments(this.config, this.projectId, "issues/" + issue.getIssueIid());
            issueComments.forEach(comment -> comment.put("MRorIssueId", issue.getIssueIid()));
            issueComments.forEach(comment -> comment.put("MRorIssueName", issue.getIssueName()));
            comments.addAll(issueComments);
        }

        for(MergeRequestEntity mr : this.mergeRequestEntities) {
            List<JSONObject> mrComments = this.extractor.getComments(this.config, this.projectId, "merge_requests/" + mr.getIid());
            mrComments.forEach(comment -> comment.put("MRorIssueId", mr.getIid()));
            mrComments.forEach(comment -> comment.put("MRorIssueName", mr.getMergeRequestName()));
            comments.addAll(mrComments);
        }
        comments.forEach(comment -> comment.put("project_id", this.projectId));
        return comments.stream().map(CommentEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestDiffVersionsEntity> getAndParseMergeRequestsDiffVersions() {
        List<JSONObject> mergeRequestsDiffVersions =  new ArrayList<>();
        for(MergeRequestEntity mr: this.mergeRequestEntities) {
            List<JSONObject> list = extractor.getMergeRequestsDiffVersions(this.config, this.projectId, mr.getIid());
            list.forEach(mrDiffs -> mrDiffs.put("project_id", this.projectId));
            list.forEach(mrDiffs -> mrDiffs.put("merge_request_iid", mr.getIid()));
            mergeRequestsDiffVersions.addAll(list);
        }
        return mergeRequestsDiffVersions.stream().map(MergeRequestDiffVersionsEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestDiffsEntity> getAndParseMergeRequestsDiffs() {
        List<JSONObject> mergeRequestsDiffs = new ArrayList<>();
        for(MergeRequestEntity mr: this.mergeRequestEntities) {
            for(MergeRequestDiffVersionsEntity mrDiff: this.MRDiffVersions) {
                List<JSONObject> list = extractor.getMergeRequestsDiff(this.config, this.projectId, mr.getIid(), mrDiff.getId());
                list.forEach(mrDiffs -> mrDiffs.put("project_id", this.projectId));
                list.forEach(mrDiffs -> mrDiffs.put("merge_request_iid", mr.getIid()));
                mergeRequestsDiffs.addAll(list);
            }
        }
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
