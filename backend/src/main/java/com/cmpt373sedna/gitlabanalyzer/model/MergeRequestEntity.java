package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

import static org.apache.logging.log4j.util.Strings.isNotBlank;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequestEntity {
    private @Id int id;
    private int projectId;
    private int iid;

    private String status; // TODO: Make this an enum

    private Instant createdAt;
    private @Nullable Instant mergedAt;

    private String author;

    private @ElementCollection List<String> commitIds;

    /*
    @ManyToOne
    //@JoinColumn(referencedColumnName = "memberID")
    private MemberEntity memberEntity;
     */

    public static MergeRequestEntity fromGitlabJSON(JSONObject json) {
        String mergedAt = json.optString("merged_at");

        return MergeRequestEntity.builder()
                .id(json.getInt("id"))
                .iid(json.getInt("iid"))
                .author(json.getJSONObject("author").getString("username"))
                .projectId(json.getInt("project_id"))
                .status(json.getString("state"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .mergedAt(isNotBlank(mergedAt) ? Instant.parse(mergedAt) : null)
                .build();
    }
}
