package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequest {
    private @Id int id;
    private int projectId;
    private int iid;

    private String status; // TODO: Make this an enum

    private Instant createdAt;
    private @Nullable Instant mergedAt;

    private @ElementCollection List<String> commitIds;

    public static MergeRequest fromGitlabJSON(JSONObject json) {
        return MergeRequest.builder()
                .id(json.getInt("id"))
                .iid(json.getInt("iid"))
                .projectId(json.getInt("project_id"))
                .status(json.getString("state"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .mergedAt(Instant.parse(json.getString("merged_at")))
                .build();
    }
}
