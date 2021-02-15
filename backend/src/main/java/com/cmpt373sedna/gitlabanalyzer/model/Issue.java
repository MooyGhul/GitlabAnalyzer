package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class Issue {
    private @Id int issueId;
    private String issueName;
    private String assignee;
    private Date closedDate;


    public Issue(int issueId, String issueName, String assignee, Date closedDate) {
        this.issueId = issueId;
        this.issueName = issueName;
        this.assignee = assignee;
        this.closedDate = closedDate;
    }

    public Issue() {
        this.issueId = -1;
        this.issueName = "";
        this.assignee = "";
        this.closedDate = null;
    }
}
