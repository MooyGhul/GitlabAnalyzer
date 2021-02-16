package com.cmpt373sedna.gitlabanalyzer.model;


import lombok.Getter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Defines
 */
@Entity
public class MemberEntity {
    private @Id @Getter String memberID;
    private @Getter String name;

    @OneToMany(mappedBy = "CommitEntity", cascade= CascadeType.ALL)
    private List<CommitEntity> commits;

    @OneToMany(mappedBy = "IssueEntity", cascade=CascadeType.ALL)
    private List<IssueEntity> issues;

    @OneToMany(mappedBy = "MergeRequestEntity", cascade=CascadeType.ALL)
    private List<MergeRequestEntity> mergeRequests;

    public MemberEntity(String memberID, String name, List<CommitEntity> commits, List<IssueEntity> issues, List<MergeRequestEntity> mergeRequests) {
        this.memberID = memberID;
        this.name = name;
        this.commits = commits;
        this.issues = issues;
        this.mergeRequests = mergeRequests;
    }

}
