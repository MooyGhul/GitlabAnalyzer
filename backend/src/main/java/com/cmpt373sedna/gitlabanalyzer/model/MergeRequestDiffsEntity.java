package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequestDiffsEntity {
    private @Id int versionId;
    private String headCommitSHA;
    private String baseCommitSHA;
    private String startCommitSHA;
    private Instant createdAt;
    @Column(columnDefinition = "TEXT")
    private String diff;
    private int MRIid;
    private int projectId;
    private int diffLength;
    private String oldPath;
    private String newPath;
    @Column(columnDefinition = "TEXT")
    @ElementCollection
    private Map<String,String> diffs;

    public static MergeRequestDiffsEntity fromGitlabJSON(JSONObject json) {
        return MergeRequestDiffsEntity.builder()
                .versionId(json.getInt("id"))
                .MRIid(json.getInt("merge_request_iid"))
                .projectId(json.getInt("project_id"))
                .headCommitSHA(json.getString("head_commit_sha"))
                .baseCommitSHA(json.getString("base_commit_sha"))
                .startCommitSHA(json.getString("start_commit_sha"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .diff(getDiffs(json))
                .diffLength(json.getJSONArray("diffs").length())
                .oldPath(getOldPath(json))
                .newPath(getNewPath(json))
                .diffs(getDiff(json))
                .build();
    }
    public static String getDiffs(JSONObject json){
        JSONArray j = json.getJSONArray("diffs");
        if(j.length()==0){
            return "";
        }
        else{
            return j.getJSONObject(0).getString("diff");
        }
    }
    public static String getOldPath(JSONObject json){
        JSONArray j = json.getJSONArray("diffs");
        if(j.length()==0){
            return "";
        }
        else{
            return j.getJSONObject(0).getString("old_path");
        }
    }
    public static String getNewPath(JSONObject json){
        JSONArray j = json.getJSONArray("diffs");
        if(j.length()==0){
            return "";
        }
        else{
            return j.getJSONObject(0).getString("new_path");
        }
    }

    public static Map getDiff(JSONObject json){
        JSONArray j = json.getJSONArray("diffs");
        if(j.length()==0){
            return null;
        }
        else{
            HashMap<String,String> map = new HashMap<>();
            for(int i=0;i<j.length();i++){
                JSONObject js = j.getJSONObject(i);
                if(js.getString("old_path").equals(js.getString("new_path"))){
                    map.put(js.getString("new_path"),js.getString("diff"));
                }
                else{
                    String s = new String(js.getString("old_path") + "->" + js.getString("new_path"));
                    map.put(s,js.getString("diff"));
                }
            }
            return map;
        }
    }

}
