package com.cmpt373sedna.gitlabanalyzer.controllers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.client.RestTemplate;


public class Extractor {
    final String personalToken = "9n3kvZyqv81nQVsxBGns";
    final String projectId = "25513"; // Our GitLabAnalyzer Repo
    final String uri = "https://csil-git1.cs.surrey.sfu.ca/api/v4/projects/" + projectId + "?private_token=" + personalToken;
    private final RestTemplate restTemplate;

    public Extractor() {
        this.restTemplate = new RestTemplate();
    }

    public String[] getBasicRepoLinks() {
        try {
            // Will need to change uri for an input url parameter
            String result = restTemplate.getForObject(uri, String.class);
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

    public JSONArray getMergeRequests(String url) {
        String result = restTemplate.getForObject(url, String.class);
        return new JSONArray(result);
    }

    public JSONArray getRepoMembers(String url) {
        String result = restTemplate.getForObject(url, String.class);
        return new JSONArray(result);
    }
}
