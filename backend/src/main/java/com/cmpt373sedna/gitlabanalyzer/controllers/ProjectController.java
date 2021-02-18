package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.*;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import lombok.Getter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectController {

    final private int projectId;

    final private @Getter String projectName;

    final private Extractor e;

    final private String url;

    final private String projectToken;

    private int[] weights;

    private List<MergeRequestEntity> mergeRequestEntities;

    private List<IssueEntity> issues;

    private List<CommitEntity> commits;

    private List<String> members;

    private @Getter List<MemberEntity> memberEntities;

    @Autowired
    private ProjectEntityRepository projectRepository;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    //@Autowired
    //private MemberEntityRepository memberEntityRepository;

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
        this.members = this.e.getRepoMembers(links[6], this.projectToken); //.getAndParseMembers(links[6]);
        this.commits = this.getAndParseCommits();

        this.weights = new int[]{1, 1, 1, 1};
    }

    //projectRepository is not initialized until AFTER the constructor has been run
    //so the Project has to be added to the repo after the constructor has been initialized
    @PostConstruct
    private void postConstructor() {
        this.projectRepository.save(new ProjectEntity(projectId, projectName, getNumCommits(), getNumMR(), getNumComments()));
        this.commitRepository.saveAll(commits);
        this.mergeRequestEntityRepository.saveAll(mergeRequestEntities);
        this.issueRepository.saveAll(issues);
        this.memberEntities = getAndParseMembers();
        //this.memberEntityRepository.saveAll(memberEntities);
    }

    private List<IssueEntity> getAndParseIssues(String url) {
        List<JSONObject> issues = this.e.getIssues(url, this.projectToken);
        return issues.stream().map(IssueEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<CommitEntity> getAndParseCommits() {
        List<JSONObject> commits = this.e.getCommits(this.url, this.projectToken);

        return commits.stream().map(CommitEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MergeRequestEntity> getAndParseMergeRequests(String url) {
        List<JSONObject> mergeRequests = e.getMergeRequests(url, this.projectToken);

        return mergeRequests.stream().map(MergeRequestEntity::fromGitlabJSON).collect(Collectors.toList());
    }

    private List<MemberEntity> getAndParseMembers() {
        List<MemberEntity> mes = new ArrayList<>();

        for (int i = 0; i < this.members.size(); i++) {
            //List<MergeRequestEntity> mergeRequests = mergeRequestEntityRepository.getUserMergeRequests(this.members.get(i));
            //List<IssueEntity> issues = issueRepository.getUserIssues(this.members.get(i));
            //List<CommitEntity> commits = commitRepository.getUserCommits(this.members.get(i));
            mes.add(new MemberEntity(this.members.get(i)));
        }

        return mes;
    }

    public int getNumCommits() {
        return this.commits.size();
    }

    public int getNumMR() {
        return this.mergeRequestEntities.size();
    }

    public int getNumComments() {
        int sum = 0;

        for(IssueEntity issue: this.issues) {
            String url = this.url + "/issues" + issue.getIssueId() + "/notes";
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

    public List<String> getMembers() {
        return members;
    }

    public void printMemberEntities() {
        commitRepository.findAllByAuthor(members.get(0));
        mergeRequestEntityRepository.findAllByAuthor(members.get(0));
        issueRepository.findAllByAssignee(members.get(0));

        for (MemberEntity m: memberEntities) {

            System.out.println(m.getMemberID());
            System.out.println(m.getMergeRequests());
            System.out.println(m.getCommits());
            System.out.println(m.getIssues());
            System.out.println("\n\n");
        }
    }
}
