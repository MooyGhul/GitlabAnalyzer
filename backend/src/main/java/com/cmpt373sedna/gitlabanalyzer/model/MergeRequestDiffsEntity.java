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
import java.util.stream.Collectors;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequestDiffsEntity {
    private @Id int versionId;
    private Instant createdAt;
    private int MRIid;
    private int projectId;
    @Column(columnDefinition = "TEXT")
    @ElementCollection
    private List<String> commits;

    public static MergeRequestDiffsEntity fromGitlabJSON(JSONObject json) {
        return MergeRequestDiffsEntity.builder()
                .versionId(json.getInt("id"))
                .MRIid(json.getInt("merge_request_iid"))
                .projectId(json.getInt("project_id"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .commits(getCommits(json))
                .build();
    }
    public static List<String> getCommits(JSONObject json){
        JSONArray j = json.getJSONArray("commits");
        List<String> list = new ArrayList<>();
        if(j.length()==0){
            return list;
        }
        else{
            for(int i=0;i<j.length();i++){
                JSONObject js =  j.getJSONObject(i);
                JSONObject commitsObject = new JSONObject();
                commitsObject.put("id",js.getString("id"));
                commitsObject.put("author",js.getString("author_name"));
                commitsObject.put("date",Instant.parse(js.getString("created_at")));
                commitsObject.put("message",js.getString("message"));
                commitsObject.put("commitDiffs",js.getJSONArray("commitDiffs"));
                list.add(commitsObject.toString());
            }
        }
        return list;
    }
}
