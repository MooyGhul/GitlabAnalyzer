package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Commit {
    private @Id @GeneratedValue long commitId;
    private String commitName;
    private String author;
    private final String EMPTY_STRING = "";

    public Commit(String commitName, String author) {
        this.commitName = commitName;
        this.author = author;

    }

    public Commit() {
        this.commitName = EMPTY_STRING;
        this.author = EMPTY_STRING;
    }
}
