package com.cmpt373sedna.gitlabanalyzer.controllers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Extractor {
    private final RestTemplate restTemplate;

    public Extractor() {
        this.restTemplate = new RestTemplate();
    }

    public String[] getBasicRepoLinks(String url, String projectToken) {
        try {
            String tempUri = getApiUrl(url);
            URI uri = URI.create(tempUri +"?access_token=" + projectToken);
            String result = restTemplate.getForObject(uri, String.class);
            JSONObject jsonObject = new JSONObject(result);

            Integer id = (Integer) jsonObject.get("id");
            String name = (String)jsonObject.get("name");
            JSONObject links = (JSONObject) jsonObject.get("_links");
            String rootLink = (String) links.get("self");
            String mergeRequestLink = (String) links.get("merge_requests");
            String issuesLink = (String) links.get("issues");
            String repoBranchesLink = (String)  links.get("repo_branches");
            String membersLink = (String)  links.get("members");

            return new String[]{id.toString(), name, rootLink, mergeRequestLink, issuesLink, repoBranchesLink, membersLink};
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private String getApiUrl(String url) {
        int rootUrlIndex = url.indexOf('/', url.startsWith("https://") ? 8 : 7);
        String baseUrl = url.substring(0, rootUrlIndex+1);
        String query = url.substring(rootUrlIndex+1);
        query = URLEncoder.encode(query, StandardCharsets.UTF_8);
        return baseUrl + "api/v4/projects/" + query;
    }

    private List<JSONObject> getJsonObjects(String URL) {
        try {
            String response = restTemplate.getForObject(URL, String.class);
            JSONArray jsonResponse = new JSONArray(response);
            List<JSONObject> jsonList = new ArrayList<>();
            jsonResponse.forEach(obj -> jsonList.add((JSONObject) obj));
            return jsonList;
        } catch (HttpClientErrorException e) {
            return Collections.emptyList();
        }
    }

    public List<JSONObject> getMergeRequests(String url, String projectToken) {
        String mrURL = url + "?state=all&private_token=" + projectToken;
        return getJsonObjects(mrURL);
    }

    public List<JSONObject> getMergeRequestComments(String url, String projectToken) {
        String MRCommentURL = url + "/notes?access_token=" + projectToken;
        List<JSONObject> mergeRequests =  getJsonObjects(MRCommentURL);
        for(JSONObject mr: mergeRequests) {
            mr.put("commentType", "merge_request");
        }
        return mergeRequests;
    }

    public List<JSONObject> getMergeRequestsDiff(String url, String projectToken) {
        String MRVersionsURL = url + "/versions"+"&access_token=" + projectToken;
        List<JSONObject> MRDiffVersions = getJsonObjects(MRVersionsURL);
        return MRDiffVersions;
    }

    public List<JSONObject> getMergeRequestsDiffVersions(String url, String projectToken) {
        String MRVersionsURL = url + "&access_token=" + projectToken;
        List<JSONObject> MRDiffs = getJsonObjects(MRVersionsURL);
        return MRDiffs;
    }

    public List<JSONObject> getBranches(String url, String projectToken) {
        String branchURL = url + "?access_token=" + projectToken;
        return getJsonObjects(branchURL);
    }

    public List<JSONObject> getIssues(String url, String projectToken) {
        String issuesURL = url + "?access_token=" + projectToken;
        return getJsonObjects(issuesURL);
    }

    public List<JSONObject> getCommits(String url, String projectToken) {
        int page = 1;
        List<JSONObject> commits = new ArrayList<>();
        List<JSONObject> newCommits;
        while(true) {
            String commitURL = url + "/repository/commits?per_page=100&page=" + page + "&access_token=" + projectToken;
            newCommits = getJsonObjects(commitURL);
            if(newCommits.isEmpty()) {
                break;
            }
            commits.addAll(newCommits);
            page++;
        }
        return commits;
    }

    public List<JSONObject> getIssueComments(String url, String projectToken) {
        String commentUrl = url + "?access_token=" + projectToken;
        List<JSONObject> comments =  getJsonObjects(commentUrl);
        for(JSONObject comment: comments) {
            comment.put("commentType", "issue");
        }
        return comments;
    }

    public List<String> getRepoMembers(String url, String projectToken) {
        String memberURL = url + "?access_token=" + projectToken;
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
