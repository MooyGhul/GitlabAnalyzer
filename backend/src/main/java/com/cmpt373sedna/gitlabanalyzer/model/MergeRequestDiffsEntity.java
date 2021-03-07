package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.persistence.*;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequestDiffsEntity {
    private @Id int id;
    private String headCommitSHA;
    private String baseCommitSHA;
    private String startCommitSHA;

    private Instant createdAt;
    private String diff;

    public static MergeRequestDiffsEntity fromGitlabJSON(JSONObject json) {
        return MergeRequestDiffsEntity.builder()
                .id(json.getInt("id"))
                .headCommitSHA(json.getString("head_commit_sh"))
                .baseCommitSHA(json.getString("base_commit_sh"))
                .startCommitSHA(json.getString("start_commit_sh"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .diff(json.getJSONObject("diffs").getString("diff"))
                .build();
    }
}
