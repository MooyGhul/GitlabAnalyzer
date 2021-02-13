package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class ProjectEntity {
    private @Id int repoId;
    private String repoName;
    private int numCommits;
    private int numMR;
    private int numComments;

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;

    }

    public ProjectEntity() {
        this.repoId = -1;
        this.repoName = "";
    }
}
