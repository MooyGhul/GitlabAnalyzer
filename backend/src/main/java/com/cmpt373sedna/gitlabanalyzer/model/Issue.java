package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Issue {
    private @Id int issueId;
    private String issueName;
    private String author;
    private int wordCount;

    public Issue(int issueId, String issueName, String author, int wordCount) {
        this.issueId = issueId;
        this.issueName = issueName;
        this.author = author;
        this.wordCount = wordCount;

    }

    public Issue() {
        this.issueId = -1;
        this.issueName = "";
        this.author = "";
        this.wordCount = 0;
    }
}
