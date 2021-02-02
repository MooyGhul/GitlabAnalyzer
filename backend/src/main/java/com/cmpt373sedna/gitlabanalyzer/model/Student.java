package com.cmpt373sedna.gitlabanalyzer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public @lombok.Data class Student {
    private @Id @GeneratedValue long id; //primary key
    private String firstName;
    private String lastName;
    private String sfuID;
    private int commitScore;
    private int mergeRequestScore;
    private int totalScore;
    private final String EMPTY_STRING = "";

    public Student(String firstName, String lastName, String sfuID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.sfuID = sfuID;
    }

    public Student() {
        this.firstName = EMPTY_STRING;
        this.lastName = EMPTY_STRING;
        this.sfuID = EMPTY_STRING;
    }
}
