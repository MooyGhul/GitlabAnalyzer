package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CommitEntity {
    private @Getter
    @Id @GeneratedValue long commitId;
    private @Getter int projectId;
    private @Getter String commitName;
    private @Getter String author;
    private @Getter Instant commitDate;

    public static CommitEntity fromGitlabJSON(JSONObject json) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return CommitEntity.builder()
                    .projectId(json.getInt("project_id"))
                    .commitName(json.getString("title"))
                    .author(json.getString("author_name"))
                    .commitDate(sdf.parse(json.getString("committed_date")).toInstant())
                    .build();
        }catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return null;

    }
}
