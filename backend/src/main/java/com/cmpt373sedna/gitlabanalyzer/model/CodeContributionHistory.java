package com.cmpt373sedna.gitlabanalyzer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class CodeContributionHistory {
    private @Id @GeneratedValue long id; //primary key
    private int comments;
    private int mergeRequests;
    private int commits;
}
