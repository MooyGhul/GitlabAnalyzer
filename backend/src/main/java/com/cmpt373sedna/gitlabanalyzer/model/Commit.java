package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Commit {
    private @Id @GeneratedValue long commitId;
    private String commitName;
    private String author;
    private Instant commitDate;

    public static Commit fromGitlabJSON(JSONObject json) {

        return Commit.builder()
                .commitName(json.getString("title"))
                .author(json.getString("author_name"))
                .commitDate(Instant.parse(json.getString("committed_date")))
                .build();
    }
}
