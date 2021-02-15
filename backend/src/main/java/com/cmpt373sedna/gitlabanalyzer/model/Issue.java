package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Issue {
    private @Id int issueId;
    private String issueName;
    private String assignee;

    public Issue(int issueId, String issueName, String assignee) {
        this.issueId = issueId;
        this.issueName = issueName;
        this.assignee = assignee;

    }

    public Issue() {
        this.issueId = -1;
        this.issueName = "";
        this.assignee = "";
    }
}
