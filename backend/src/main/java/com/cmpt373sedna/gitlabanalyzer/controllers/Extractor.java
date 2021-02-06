package com.cmpt373sedna.gitlabanalyzer.controllers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


public class Extractor {
    final String personalToken = "XQUSyUSDiQUxsy6CoP8_";
    final String projectId = "2"; // Our GitLabAnalyzer Repo
    final String uri = "http://cmpt373-1211-14.cmpt.sfu.ca:8929/api/v4/projects/" + projectId;
    private final RestTemplate restTemplate;

    public Extractor() {
        this.restTemplate = new RestTemplate();
    }

    public String[] getBasicRepoLinks() {
        try {
            // Will need to change uri for an input url parameter
            String result = restTemplate.getForObject(uri +"?private_token=" + personalToken, String.class);
            JSONObject jsonObject = new JSONObject(result);

            Integer id = (Integer) jsonObject.get("id");
            String name = (String)jsonObject.get("name");
            JSONObject links = (JSONObject) jsonObject.get("_links");
            String mergeRequestLink = (String) links.get("merge_requests");
            String issuesLink = (String) links.get("issues");
            String repoBranchesLink = (String)  links.get("repo_branches");
            String membersLink = (String)  links.get("members");

            return new String[]{id.toString(), name, mergeRequestLink, issuesLink, repoBranchesLink, membersLink};
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<JSONObject> getMergeRequests(String url) {
        String mrURL = url + "?private_token=" + personalToken;
        String result = restTemplate.getForObject(mrURL, String.class);
        JSONArray objs = new JSONArray(result);
        List<JSONObject> mergeRequests = new ArrayList<>();
        objs.forEach(mr -> mergeRequests.add((JSONObject) mr));
        return mergeRequests;
    }

    public List<JSONObject> getMergeRequestComments(String MRId) {
        String MRCommentURL = uri + "/merge_requests/" + MRId + "/notes?private_token=" + personalToken;
        String result = restTemplate.getForObject(MRCommentURL, String.class);
        JSONArray jsonMRComments =  new JSONArray(result);
        List<JSONObject> mrComments = new ArrayList<>();
        jsonMRComments.forEach(comment -> mrComments.add((JSONObject) comment));
        return mrComments;
    }

    public List<JSONObject> getBranches(String url) {
        String branchURL = url + "?private_token=" + personalToken;
        String result = restTemplate.getForObject(branchURL, String.class);
        JSONArray jsonBranches =  new JSONArray(result);
        List<JSONObject> branches = new ArrayList<>();
        jsonBranches.forEach(branch -> branches.add((JSONObject) branch));
        return branches;
    }

    public List<JSONObject> getIssues(String url) {
        String issuesURL = url + "?private_token=" + personalToken;
        String result = restTemplate.getForObject(issuesURL, String.class);
        JSONArray objs = new JSONArray(result);
        List<JSONObject> issues = new ArrayList<>();
        objs.forEach(issue -> issues.add((JSONObject) issue));
        return issues;
    }

    public List<String> getRepoMembers(String url) {
        String memberURL = url + "?private_token=" + personalToken;
        String result = restTemplate.getForObject(memberURL, String.class);
        JSONArray objs = new JSONArray(result);
        List<String> members = new ArrayList<>();
        objs.forEach(member -> {
            JSONObject obj = (JSONObject) member;
            members.add((String) obj.get("username"));
        });
        return members;
    }
}
