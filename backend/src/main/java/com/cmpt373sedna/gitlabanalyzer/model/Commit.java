package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class Commit {
    private @Id @GeneratedValue long commitId;
    private String commitName;
    private String author;
    private Date commitDate;
    private final String EMPTY_STRING = "";

    public Commit(String commitName, String author, Date commitDate) {
        this.commitName = commitName;
        this.author = author;
        this.commitDate = commitDate;

    }

    public Commit() {
        this.commitName = EMPTY_STRING;
        this.author = EMPTY_STRING;
        this.commitDate = null;
    }
}
