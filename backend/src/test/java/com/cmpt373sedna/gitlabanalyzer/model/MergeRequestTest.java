package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MergeRequestTest {

    @Test
    void fromGitlabJSON_parses_correctly() throws IOException {
        MergeRequest expected = MergeRequest.builder()
                .id(1)
                .iid(1)
                .projectId(3)
                .status("merged")
                .authorId(1)
                .createdAt(Instant.parse("2017-04-29T08:46:00Z"))
                .mergedAt(Instant.parse("2018-09-07T11:16:17.520Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequest actual = MergeRequest.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }
}