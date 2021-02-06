package com.cmpt373sedna.gitlabanalyzer.model;
import com.cmpt373sedna.gitlabanalyzer.controllers.Extractor;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Repository {
    private @Id
    int repoId;
    private String repoName;

    @ElementCollection
    private List<Integer> weights;

    @ElementCollection @Type(type = "jsonb")
    private List<JSONObject> mergeRequests;

    @Type(type = "jsonb")
    private List<JSONObject> issues;

    @Type(type = "jsonb")
    private List<JSONObject> branches;

    @ElementCollection
    private List<String> members;

    public Repository(String url) {
        this.mergeRequests = new ArrayList<>();
        this.issues = new ArrayList<>();
        this.branches = new ArrayList<>();
        this.members = new ArrayList<>();

        Extractor e = new Extractor();
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = e.getBasicRepoLinks();
        this.repoId = Integer.parseInt(links[0]);
        this.repoName = links[1];

        JSONArray jsonMergeRequests = e.getMergeRequests(links[2]);
        jsonMergeRequests.forEach(mr -> this.mergeRequests.add((JSONObject) mr));

        JSONArray jsonIssues = e.getIssues(links[3]);
        jsonIssues.forEach(issue -> this.issues.add((JSONObject) issue));

        JSONArray jsonBranches = e.getBranches(links[4]);
        jsonBranches.forEach(branch -> this.branches.add((JSONObject) branch));

        JSONArray jsonMembers = e.getRepoMembers(links[5]);
        jsonMembers.forEach(member -> {
            JSONObject obj = (JSONObject) member;
            this.members.add((String) obj.get("username"));
        });

    }

    public Repository() {
        this.mergeRequests = new ArrayList<>();
        this.issues = new ArrayList<>();
        this.branches = new ArrayList<>();
        this.members = new ArrayList<>();
        this.repoId = -1;
        this.repoName = "";
    }
}
