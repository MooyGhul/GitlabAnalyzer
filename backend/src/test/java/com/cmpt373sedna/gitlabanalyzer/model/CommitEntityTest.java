package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommitEntityTest {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    @Test
    void fromGitlabJSON_parses_Commit_correctly() {
        CommitEntity expected = null;
        List<String> list = new ArrayList<>();
        JSONObject commitDiffs = new JSONObject();
        commitDiffs.put("diff","@@ -1,5 +1,8 @@\n # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n \n+# package-lock\n+package-lock.json\n+\n # dependencies\n /node_modules\n /.pnp\n");
        commitDiffs.put("new_path","frontend.gitignore");
        commitDiffs.put("old_path","frontend.gitignore");
        list.add(commitDiffs.toString());
        try {
            expected = CommitEntity.builder()
                    .commitId("ed899a2f4b50b4370feeea94676502b42383c746")
                    .projectId(3)
                    .commitName("Replace sanitize with escape once")
                    .author("Example User")
                    .commitDate(sdf.parse("2012-09-20T11:50:22+03:00").toInstant())
                    .url("https://gitlab.example.com/thedude/gitlab-foss/-/commit/ed899a2f4b50b4370feeea94676502b42383c746")
                    .diffs(list)
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
