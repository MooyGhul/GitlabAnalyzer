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
public class MergeRequestDiffVersionsEntity {

    private @Id int id;
    private String headCommitSHA;
    private String baseCommitSHA;
    private String startCommitSHA;
    private int MRIid;
    private int projectId;
    private Instant createdAt;



    public static MergeRequestDiffVersionsEntity fromGitlabJSON(JSONObject json) {
        return MergeRequestDiffVersionsEntity.builder()
                .id(json.getInt("id"))
                .MRIid(json.getInt("merge_request_iid"))
                .projectId(json.getInt("project_id"))
                .headCommitSHA(json.getString("head_commit_sha"))
                .baseCommitSHA(json.getString("base_commit_sha"))
                .startCommitSHA(json.getString("start_commit_sha"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .build();
    }
}
