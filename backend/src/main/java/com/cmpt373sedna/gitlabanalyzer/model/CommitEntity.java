package com.cmpt373sedna.gitlabanalyzer.model;

import com.sun.istack.Nullable;
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

public class CommitEntity {
    private @Id @GeneratedValue long commitId;
    private String commitName;
    private String author;
    private Instant commitDate;

    /*
    @ManyToOne
    //@JoinColumn(referencedColumnName = "memberID")
    private MemberEntity memberEntity;

     */

    public static CommitEntity fromGitlabJSON(JSONObject json) {

        return CommitEntity.builder()
                .commitName(json.getString("title"))
                .author(json.getString("author_name"))
                .commitDate(Instant.parse(json.getString("committed_date")))
                .build();
    }
}
