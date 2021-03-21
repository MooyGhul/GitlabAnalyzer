package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class MergeRequestDiffVersionsEntityTest {
    @Test
    void fromGitlabJSON_parses_MRDiffVersions_correctly() throws IOException {
        MergeRequestDiffVersionsEntity expected = MergeRequestDiffVersionsEntity.builder()
                .id(110)
                .MRIid(87)
                .projectId(2)
                .headCommitSHA("33e2ee8579fda5bc36accc9c6fbd0b4fefda9e30")
                .baseCommitSHA("eeb57dffe83deb686a60a71c16c32f71046868fd")
                .startCommitSHA("eeb57dffe83deb686a60a71c16c32f71046868fd")
                .createdAt(Instant.parse("2016-07-26T14:44:48.926Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/MRDiffVersions.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestDiffVersionsEntity actual = MergeRequestDiffVersionsEntity.fromGitlabJSON(json);

        System.out.println(actual.toString());
        assertEquals(expected,actual);
    }
}
