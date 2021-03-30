package com.cmpt373sedna.gitlabanalyzer.controllers;



import com.cmpt373sedna.gitlabanalyzer.model.*;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import java.util.*;

import static java.util.stream.Collectors.toList;

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
        this.MRDiffVersions = this.getAndParseMergeRequestsDiffVersions();
        this.MRDiffs = this.getAndParseMergeRequestsDiffs();

        return this;
    }

    private List<IssueEntity> getAndParseIssues() {
        List<JSONObject> issues = this.extractor.getIssues(this.config, this.projectId);
        return issues.stream().map(IssueEntity::fromGitlabJSON).collect(toList());
    }
    private List<CommitEntity> getAndParseCommits() {
        List<JSONObject> commits = this.extractor.getCommits(this.config, this.projectId);
        commits.forEach(commit -> commit.put("project_id", this.projectId));
        return commits.stream().map(CommitEntity::fromGitlabJSON).collect(toList());
    }

    private List<MergeRequestEntity> getAndParseMergeRequests() {
        List<JSONObject> mergeRequests = extractor.getMergeRequests(this.config, this.projectId);
        return mergeRequests.stream().map(MergeRequestEntity::fromGitlabJSON).collect(toList());
    }

    protected double calcScore(List<String> diffs) {
        List<String> lines = new ArrayList<>();
        for(String diff: diffs) {
            lines.addAll(Arrays.stream(diff.split("\n")).filter(line ->
                    (line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches("[-+]\\s*//.*|[+-]\\s*[{}()]{1,2}\\s*"))
            ).collect(toList()));
        }

        return parseScore(lines);
    }

    private double parseScore(List<String> lines) {
        double score = 0;
        Iterator<String> itr = lines.iterator();
        String prev = "";

        if(itr.hasNext()) {
            prev = itr.next();
            score += prev.startsWith("-") ? 0.2 : 1;
        }

        while(itr.hasNext()) {
            String current = itr.next();
            int shortestString = Math.min(current.trim().length(), prev.trim().length());
            if(current.startsWith("+")) {
                if(prev.startsWith("+")) {
                    score++;
                } else if(StringUtils.getLevenshteinDistance(current.substring(1), prev.substring(1)) > shortestString){
                    score++;
                }
            } else {
                score += 0.2;
            }

            prev = current;
        }

        return score;
    }

    private List<CommentEntity> getAndParseComments() {
        List<JSONObject> comments = new ArrayList<>();
        for(IssueEntity issue : this.issuesEntities) {
            List<JSONObject> issueComments = this.extractor.getComments(this.config, this.projectId, "issues/" + issue.getIssueIid());
            issueComments = issueComments.stream().peek(comment -> {
                comment.put("created_by", issue.getAssignee());
                comment.put("MRorIssueId", issue.getIssueIid());
                comment.put("MRorIssueName", issue.getIssueName());
            }).collect(toList());
            comments.addAll(issueComments);
        }

        for(MergeRequestEntity mr : this.mergeRequestEntities) {
            List<JSONObject> mrComments = this.extractor.getComments(this.config, this.projectId, "merge_requests/" + mr.getIid());
            mrComments = mrComments.stream().peek(comment -> {
                comment.put("created_by", mr.getAuthor());
                comment.put("MRorIssueId", mr.getIid());
                comment.put("MRorIssueName", mr.getMergeRequestName());
            }).collect(toList());
            comments.addAll(mrComments);
        }
        comments.forEach(comment -> comment.put("project_id", this.projectId));
        return comments.stream().map(CommentEntity::fromGitlabJSON).collect(toList());
    }

    private List<MergeRequestDiffVersionsEntity> getAndParseMergeRequestsDiffVersions() {
        List<JSONObject> mergeRequestsDiffVersions =  new ArrayList<>();
        for(MergeRequestEntity mr: this.mergeRequestEntities) {
            List<JSONObject> list = extractor.getMergeRequestsDiffVersions(this.config, this.projectId, mr.getIid());
            mergeRequestsDiffVersions.addAll(list);
        }
        return mergeRequestsDiffVersions.stream().map(MergeRequestDiffVersionsEntity::fromGitlabJSON).collect(toList());
    }

    private List<MergeRequestDiffsEntity> getAndParseMergeRequestsDiffs() {
        List<JSONObject> mergeRequestsDiffs = new ArrayList<>();
        for(MergeRequestDiffVersionsEntity mrDiffs: this.MRDiffVersions) {
            JSONObject mrDiff = extractor.getMergeRequestsDiff(this.config, this.projectId, mrDiffs.getMRIid(), mrDiffs.getId());
            mergeRequestsDiffs.add(mrDiff);
        }
        return mergeRequestsDiffs.stream().map(MergeRequestDiffsEntity::fromGitlabJSON).collect(toList());
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
