package com.cmpt373sedna.gitlabanalyzer.model;
import com.sun.istack.Nullable;
import lombok.*;
import org.json.JSONObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;


@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    private @Id @GeneratedValue int commentId;
    private String commentType;
    private int projectId;
    private int commentTypeId;
    @Column(columnDefinition="text")
    private @Nullable String commentText;
    private @Nullable String commenter;
    private @Nullable Instant commentDate;


    public static CommentEntity fromGitlabJSON(JSONObject json) {

        return CommentEntity.builder()
                .commentId(json.getInt("noteable_id"))
                .projectId(json.getInt("project_id"))
                .commenter(json.getJSONObject("author").getString("username"))
                .commentType(json.getString("noteable_type"))
                .commentText(json.getString("body"))
                .commentDate(Instant.parse(json.getString("created_at")))
                .build();
    }

}
