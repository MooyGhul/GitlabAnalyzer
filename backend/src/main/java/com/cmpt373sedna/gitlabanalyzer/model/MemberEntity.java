package com.cmpt373sedna.gitlabanalyzer.model;


import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.IssueEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

//@Entity
public class MemberEntity {
    private @Id @Getter String memberID;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    public MemberEntity(String memberID) {
        this.memberID = memberID;
    }

    public List<CommitEntity> getCommits() {
        return commitRepository.findAllByAuthor(memberID);
    }

    public List<IssueEntity> getIssues() {
        return issueRepository.findAllByAssignee(memberID);
    }

    public List<MergeRequestEntity> getMergeRequests() {
        return mergeRequestEntityRepository.findAllByAuthor(memberID);
    }

    /*
    @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.ALL)
    private @Getter List<CommitEntity> commits;

    @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.ALL)
    private @Getter List<IssueEntity> issues;

    @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.ALL)
    private @Getter List<MergeRequestEntity> mergeRequests;

    public MemberEntity(String memberID, List<CommitEntity> commits, List<IssueEntity> issues, List<MergeRequestEntity> mergeRequests) {
        this.memberID = memberID;
        this.commits = commits;
        this.issues = issues;
        this.mergeRequests = mergeRequests;
    }

     */
}
