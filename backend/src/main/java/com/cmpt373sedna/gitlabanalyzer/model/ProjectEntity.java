package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.Id;

import java.util.List;

import static java.util.stream.Collectors.toList;

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



    public ProjectEntity() {
        this.repoId = -1;
        this.repoName = "";
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
    }

    public static ProjectEntity fromGitlabJSON(JSONObject json) {
        return ProjectEntity.builder()
                .repoId(json.getInt("id"))
                .repoName(json.getString("name"))
                .build();
    }

    public static List<ProjectEntity> fromGitlabJSONList(List<JSONObject> projectsArray) {
        return projectsArray.stream()
                .map(obj -> ProjectEntity.builder()
                        .repoId(obj.getInt("id"))
                        .repoName(obj.getString("name"))
                        .build())
                .collect(toList());
    }
}
