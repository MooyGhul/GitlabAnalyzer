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
        Extractor e = new Extractor();
        // 0: id.toString(), 1: name, 2:mergeRequestLink, 3:issuesLink, 4:repoBranchesLink, 5:membersLink
        String[] links = e.getBasicRepoLinks();

        this.repoId = Integer.parseInt(links[0]);
        this.repoName = links[1];
        this.mergeRequests = e.getMergeRequests(links[2]);
        this.issues = e.getIssues(links[3]);
        this.branches = e.getBranches(links[4]);
        this.members = e.getRepoMembers(links[5]);

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
