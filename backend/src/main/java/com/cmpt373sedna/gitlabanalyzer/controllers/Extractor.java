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

    private List<JSONObject> getJsonObjects(String URL) {
        String response = restTemplate.getForObject(URL, String.class);
        JSONArray jsonResponse =  new JSONArray(response);
        List<JSONObject> jsonList = new ArrayList<>();
        jsonResponse.forEach(obj -> jsonList.add((JSONObject) obj));
        return jsonList;
    }

    public List<JSONObject> getMergeRequests(String url) {
        String mrURL = url + "?private_token=" + personalToken;
        return getJsonObjects(mrURL);
    }

    public List<JSONObject> getMergeRequestComments(String MRId) {
        String MRCommentURL = uri + "/merge_requests/" + MRId + "/notes?private_token=" + personalToken;
        return getJsonObjects(MRCommentURL);
    }

    public List<JSONObject> getBranches(String url) {
        String branchURL = url + "?private_token=" + personalToken;
        return getJsonObjects(branchURL);
    }

    public List<JSONObject> getIssues(String url) {
        String issuesURL = url + "?private_token=" + personalToken;
        return getJsonObjects(issuesURL);
    }

    public List<JSONObject> getCommits(String url) {
        String commitURL = url + "/repository/commits?private_token=" + personalToken;
        return getJsonObjects(commitURL);
    }

    public List<JSONObject> getIssueComments(String url) {
        String commentUrl = url + "?private_token=" + personalToken;
        return getJsonObjects(commentUrl);
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
