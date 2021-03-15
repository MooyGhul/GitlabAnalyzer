package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    @Column(length = 250)
    private String description;

    private @ElementCollection List<String> commitIds;

    public static MergeRequestEntity fromGitlabJSON(JSONObject json) {
        String mergedAt = json.optString("merged_at");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return MergeRequestEntity.builder()
                    .id(json.getInt("id"))
                    .iid(json.getInt("iid"))
                    .author(json.getJSONObject("author").getString("username"))
                    .projectId(json.getInt("project_id"))
                    .status(json.getString("state"))
                    .description(json.getString("description"))
                    .createdAt(Instant.parse(json.getString("created_at")))
                    .mergedAt(isNotBlank(mergedAt) ? sdf.parse(mergedAt).toInstant() : null)
                    .build();
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
