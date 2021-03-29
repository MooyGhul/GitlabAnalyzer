package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
public class MRDiffsEntityTest {
    @Test
    void fromGitlabJSON_parses_MRDiffs_correctly() throws IOException {
        MergeRequestDiffsEntity expected = MergeRequestDiffsEntity.builder()
                .versionId(110)
                .MRIid(87)
                .projectId(2)
                .createdAt(Instant.parse("2016-07-26T14:44:48.926Z"))
                .commits(getCommitDiffs())
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/MRDiffs.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestDiffsEntity actual = MergeRequestDiffsEntity.fromGitlabJSON(json);

        System.out.println(actual.toString());
        assertEquals(expected,actual);
    }
    public List<String> getCommitDiffs(){
        JSONObject commitDiff = new JSONObject();
        commitDiff.put("diff", "--- a/doc/update/5.4-to-6.0.md\n+++ b/doc/update/5.4-to-6.0.md\n@@ -71,6 +71,8 @@\n sudo -u git -H bundle exec rake migrate_keys RAILS_ENV=production\n sudo -u git -H bundle exec rake migrate_inline_notes RAILS_ENV=production\n \n+sudo -u git -H bundle exec rake gitlab:assets:compile RAILS_ENV=production\n+\n ```\n \n ### 6. Update config files");
        commitDiff.put("new_path", "doc/update/5.4-to-6.0.md");
        commitDiff.put("old_path", "doc/update/5.4-to-6.0.md");
        commitDiff.put("a_mode", "100644");
        commitDiff.put("b_mode", "100644");
        commitDiff.put("new_file", false);
        commitDiff.put("renamed_file", false);
        commitDiff.put("deleted_file", false);
        JSONArray n = new JSONArray();
        n.put(commitDiff);
        JSONObject j = new JSONObject();
        j.put("id","33e2ee8579fda5bc36accc9c6fbd0b4fefda9e30");
        j.put("author","Administrator");
        j.put("date","2016-07-26T14:44:29Z");
        j.put("message","Change year to 2018");
        j.put("commitDiffs",n);
        List<String> x = new ArrayList<>();
        x.add(j.toString());
        return x;
    }
}

