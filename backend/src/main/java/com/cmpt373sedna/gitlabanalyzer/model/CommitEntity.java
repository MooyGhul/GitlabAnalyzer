package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CommitEntity {
    private @Getter
    @Id String commitId;
    private @Getter int projectId;
    private @Getter String commitName;
    private @Getter String author;
    private @Getter Instant commitDate;
    private String url;
    @Column(columnDefinition = "TEXT")
    @ElementCollection
    private List<String> diffs;
    private Boolean hasMr;
    private int MRIid;

    public static CommitEntity fromGitlabJSON(JSONObject json) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return CommitEntity.builder()
                    .commitId((json.getString("id")))
                    .projectId(json.getInt("project_id"))
                    .commitName(json.getString("title"))
                    .author(json.getString("author_name"))
                    .commitDate(sdf.parse(json.getString("committed_date")).toInstant())
                    .url(json.getString("web_url"))
                    .hasMr(json.getBoolean("hasMR"))
                    .MRIid(json.getInt("mr_iid"))
                    .diffs(getCommitDiffs(json))
                    .build();
        }catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return null;

    }
    public static List<String> getCommitDiffs(JSONObject json) {
        JSONArray j = json.getJSONArray("diffs");
        List<String> list = new ArrayList<>();
        for(int i=0;i<j.length();i++){
            JSONObject js = j.getJSONObject(i);
            JSONObject commitDiffs = new JSONObject();
            commitDiffs.put("diff",js.getString("diff"));
            commitDiffs.put("new_path",js.getString("new_path"));
            commitDiffs.put("old_path",js.getString("old_path"));
            list.add(commitDiffs.toString());
        }
        return list;
    }
}
