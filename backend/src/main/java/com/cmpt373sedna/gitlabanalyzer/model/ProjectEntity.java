package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@Builder
public class ProjectEntity {
    private @Getter
    @Id int repoId;
    private @Getter String repoName;
    private @Getter int numCommits;
    private @Getter int numMR;
    private @Getter int numComments;

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;

    }

    public static ProjectEntity fromGitlabJSON(JSONObject json) {
        return ProjectEntity.builder()
                .repoId(json.getInt("id"))
                .repoName(json.getString("name"))
                .build();
    }

    public ProjectEntity() {
        this.repoId = -1;
        this.repoName = "";
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
    }
}
