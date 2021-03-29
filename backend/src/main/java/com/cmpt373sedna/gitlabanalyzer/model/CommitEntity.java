package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.*;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CommitEntity {
    private @Getter
    @Id String commitId;
    private @Getter int projectId;
    private @Getter String commitName;
    private @Getter String author;
    private @Getter Instant commitDate;
    private String url;

    public static CommitEntity fromGitlabJSON(JSONObject json) {
        return CommitEntity.builder()
                .commitId((json.getString("id")))
                .projectId(json.getInt("project_id"))
                .commitName(json.getString("title"))
                .author(json.getString("author_name"))
                .commitDate(Instant.parse(json.getString("committed_date")))
                .url(json.getString("web_url"))
                .build();
    }
}
