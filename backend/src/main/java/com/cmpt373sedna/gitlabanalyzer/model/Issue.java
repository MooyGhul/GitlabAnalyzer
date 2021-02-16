package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    private @Id int issueId;
    private int projectId;
    private String issueName;
    private @Nullable String assignee;
    private @Nullable Instant openedDate;
    private @Nullable Instant closedDate;


    public static Issue fromGitlabJSON(JSONObject json) {
        Object o = json.get("assignee");
        JSONObject assigneeObject = !JSONObject.NULL.equals(o) ? (JSONObject) o : null;

        o = json.get("closed_at");
        String closedDateString = !JSONObject.NULL.equals(o) ? json.getString("created_at") : null;

        return Issue.builder()
                .issueId(json.getInt("id"))
                .projectId(json.getInt("project_id"))
                .issueName(json.getString("title"))
                .assignee(!JSONObject.NULL.equals(assigneeObject) ? assigneeObject.getString("name") : null)
                .openedDate(Instant.parse(json.getString("created_at")))
                .closedDate(closedDateString == null ? null : Instant.parse(closedDateString))
                .build();

    }
}
