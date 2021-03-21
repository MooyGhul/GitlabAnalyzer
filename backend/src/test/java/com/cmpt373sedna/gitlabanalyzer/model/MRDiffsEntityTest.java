package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;


import static org.junit.jupiter.api.Assertions.assertEquals;
public class MRDiffsEntityTest {
    @Test
    void fromGitlabJSON_parses_MRDiffs_correctly() throws IOException {
        MergeRequestDiffsEntity expected = MergeRequestDiffsEntity.builder()
                .versionId(110)
                .MRIid(87)
                .projectId(2)
                .headCommitSHA("33e2ee8579fda5bc36accc9c6fbd0b4fefda9e30")
                .baseCommitSHA("eeb57dffe83deb686a60a71c16c32f71046868fd")
                .startCommitSHA("eeb57dffe83deb686a60a71c16c32f71046868fd")
                .createdAt(Instant.parse("2016-07-26T14:44:48.926Z"))
                .diff("--- /dev/null\n+++ b/LICENSE\n@@ -0,0 +1,21 @@\n+The MIT License (MIT)\n+\n+Copyright (c) 2018 Administrator\n+\n+Permission is hereby granted, free of charge, to any person obtaining a copy\n+of this software and associated documentation files (the \"Software\"), to deal\n+in the Software without restriction, including without limitation the rights\n+to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n+copies of the Software, and to permit persons to whom the Software is\n+furnished to do so, subject to the following conditions:\n+\n+The above copyright notice and this permission notice shall be included in all\n+copies or substantial portions of the Software.\n+\n+THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n+IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n+FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n+AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n+LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n+OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n+SOFTWARE.\n")
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/MRDiffs.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestDiffsEntity actual = MergeRequestDiffsEntity.fromGitlabJSON(json);

        System.out.println(actual.toString());
        assertEquals(expected,actual);
    }
}

