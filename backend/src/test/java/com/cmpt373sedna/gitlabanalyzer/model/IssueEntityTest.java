package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class IssueEntityTest {

    @Test
    void fromGitlabJSON_parses_open_Issue_correctly() throws IOException {
        IssueEntity expected = IssueEntity.builder()
                .issueId(1)
                .issueIid(1)
                .projectId(3)
                .issueName("test1")
                .issueDescription("fixed login page css paddings")
                .assignee("Administrator")
                .openedDate(Instant.parse("2017-04-29T08:46:00Z"))
                .closedDate(null)
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleOpenMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        IssueEntity actual = IssueEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }

    @Test
    void fromGitlabJSON_parses_closed_Issue_correctly() throws IOException {
        IssueEntity expected = IssueEntity.builder()
                .issueId(41)
                .issueIid(1)
                .projectId(4)
                .issueName("Ut commodi ullam eos dolores perferendis nihil sunt.")
                .issueDescription("Omnis vero earum sunt corporis dolor et placeat.")
                .assignee("Dr. Luella Kovacek")
                .openedDate(Instant.parse("2016-01-04T15:31:46.176Z"))
                .closedDate(Instant.parse("2016-01-04T15:31:46.176Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleClosedIssue.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        IssueEntity actual = IssueEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }
}
