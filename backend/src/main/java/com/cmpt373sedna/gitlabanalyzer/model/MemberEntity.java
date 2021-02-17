package com.cmpt373sedna.gitlabanalyzer.model;


import lombok.Getter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class MemberEntity {
    private @Id @Getter String memberID;

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
}
