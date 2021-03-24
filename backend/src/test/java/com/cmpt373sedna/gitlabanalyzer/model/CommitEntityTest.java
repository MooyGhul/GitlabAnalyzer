package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommitEntityTest {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    @Test
    void fromGitlabJSON_parses_Commit_correctly() {
        CommitEntity expected = null;
        try {
            expected = CommitEntity.builder()
                    .commitId("ed899a2f4b50b4370feeea94676502b42383c746")
                    .projectId(3)
                    .commitName("Replace sanitize with escape once")
                    .author("Example User")
                    .commitDate(sdf.parse("2012-09-20T11:50:22+03:00").toInstant())
                    .url("https://gitlab.example.com/thedude/gitlab-foss/-/commit/ed899a2f4b50b4370feeea94676502b42383c746")
                    .build();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String jsonString = "";
        try {
            jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleCommit.json").readAllBytes());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        JSONObject json = new JSONObject(jsonString);
        CommitEntity actual = CommitEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }
}
