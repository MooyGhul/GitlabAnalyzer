package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.text.ParseException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MergeRequestEntityTest {

    @Test
    void fromGitlabJSON_parses_open_MR_correctly() throws IOException {
        MergeRequestEntity expected = MergeRequestEntity.builder()
                .id(1)
                .iid(1)
                .projectId(3)
                .status("opened")
                .author("admin")
                .createdAt(Instant.parse("2017-04-29T07:00:00Z"))
                .mergedAt(null)
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleOpenMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestEntity actual = MergeRequestEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }

    @Test
    void fromGitlabJSON_parses_merged_MR_correctly() throws IOException {
        MergeRequestEntity expected = MergeRequestEntity.builder()
                .id(1)
                .iid(1)
                .projectId(3)
                .status("merged")
                .author("admin")
                .createdAt(Instant.parse("2017-04-29T08:46:00Z"))
                .mergedAt(Instant.parse("2018-09-07T07:00:00Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleMergedMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestEntity actual = MergeRequestEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }
}