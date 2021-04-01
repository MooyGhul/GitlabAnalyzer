package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class Extractor {
    private final RestTemplate restTemplate;

    public Extractor() {
        this.restTemplate = new RestTemplate();
    }

    public List<ProjectEntity> getProjects(ConfigEntity config) {
        List<JSONObject> projectsArray = getJsonObjectsList(buildUri(config));

        return projectsArray.stream()
                .map(obj -> ProjectEntity.builder()
                        .repoId(obj.getInt("id"))
                        .repoName(obj.getString("name"))
                        .build())
                .collect(toList());
    }

    public ProjectEntity getProject(ConfigEntity config, String projectId) {
        JSONObject projectJSON = getJsonObject(buildUri(config, projectId));

        return ProjectEntity.builder()
                .repoId(projectJSON.getInt("id"))
                .repoName(projectJSON.getString("name"))
                .build();
    }

    public List<JSONObject> getMergeRequests(ConfigEntity config, int projectId) {
        int page = 1;
        List<JSONObject> mr = new ArrayList<>();
        List<JSONObject> newMr = getJsonObjectsList(buildUri(config, projectId, "merge_requests?per_page=100&page=" + page + "&target_branch=master"));
        while(newMr.size() > 0) {
            mr.addAll(newMr);

            page += 1;
            newMr = getJsonObjectsList(buildUri(config, projectId, "merge_requests?per_page=100&page=" + page));
        }

        for(JSONObject mrs : mr){
            List<JSONObject> l = getJsonObjectsList(buildUri(config, projectId,"merge_requests/" + mrs.getInt("iid") + "/commits"));
            List<String> commits = new ArrayList<>();
            for(JSONObject commit : l){
                commits.add(commit.getString("id"));
            }
            mrs.put("commits",commits);
            List<JSONObject> MRDiffVersions = getJsonObjectsList(buildUri(config,projectId,"merge_requests/" + mrs.getInt("iid") + "/versions"));
            JSONObject j = getJsonObject(buildUri(config,projectId,"merge_requests/" + mrs.getInt("iid") + "/versions/"+MRDiffVersions.get(0).getInt("id")));
            mrs.put("mrDiffs",j.getJSONArray("diffs"));
        }
        return mr;
    }

    public List<JSONObject> getComments(ConfigEntity config, int projectId, String path) {
        List<JSONObject> comments = getJsonObjectsList(buildUri(config, projectId, path + "/notes"));
        return filterJSONComments(comments);
    }



    public List<JSONObject> getIssues(ConfigEntity config, int projectId) {
        int page = 1;
        List<JSONObject> issues = new ArrayList<>();
        List<JSONObject> newIssues = getJsonObjectsList(buildUri(config, projectId, "issues?per_page=100&page=" + page));
        while(newIssues.size() > 0) {
            issues.addAll(newIssues);

            page += 1;
            newIssues = getJsonObjectsList(buildUri(config, projectId, "issues?per_page=100&page=" + page));
        }
        return issues;
    }

    public List<JSONObject> getCommits(ConfigEntity config, int projectId) {
        int page = 1;
        List<JSONObject> commits = new ArrayList<>();
        List<JSONObject> newCommits = getJsonObjectsList(buildUri(config, projectId, "repository/commits?per_page=100&page=" + page));
        while(newCommits.size() > 0) {
            commits.addAll(newCommits);

            page += 1;
            newCommits = getJsonObjectsList(buildUri(config, projectId, "repository/commits?per_page=100&page=" + page));
        }
        for(int i=0;i<commits.size();i++){
            List<JSONObject> l = getJsonObjectsList(buildUri(config, projectId, "repository/commits/"+ commits.get(i).getString("id") + "/diff"));
            commits.get(i).put("diffs",l);
        }
        return commits;
    }

    public List<String> getRepoMembers(ConfigEntity config, int projectId) {
        List<JSONObject> membersJson = getJsonObjectsList(buildUri(config, projectId, "members"));

        return membersJson.stream()
                .map(obj -> obj.getString("username"))
                .collect(toList());
    }

    public JSONObject getRepoFileTypes(ConfigEntity config, int projectId) {
        String response = restTemplate.getForObject(buildUri(config, projectId, "languages"), String.class);
        return new JSONObject(response);
    }

    private URI buildUri(ConfigEntity config, int projectId, String path) {
        return URI.create(config.getUrl() + "api/v4/projects/" + projectId + "/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
    }

    private URI buildUri(ConfigEntity config, int projectId) {
        return URI.create(config.getUrl() + "api/v4/projects/" + projectId + "?access_token=" + config.getToken());
    }

    private URI buildUri(ConfigEntity config, String path) {
        return URI.create(config.getUrl() + "api/v4/projects/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
    }

    private URI buildUri(ConfigEntity config) {
        return URI.create(config.getUrl() + "api/v4/projects?access_token=" + config.getToken());
    }

    private List<JSONObject> getJsonObjectsList(URI url) {
        String response = restTemplate.getForObject(url, String.class);
        JSONArray jsonResponse = new JSONArray(response);

        List<JSONObject> jsonList = new ArrayList<>();
        jsonResponse.forEach(obj -> jsonList.add((JSONObject) obj));
        return jsonList;
    }


    private JSONObject getJsonObject(URI url) {
        String response = restTemplate.getForObject(url, String.class);
        return new JSONObject(response);
    }

    private List<JSONObject> filterJSONComments(List<JSONObject> comments) {
        return comments.stream()
                .filter(comment -> !comment.getBoolean("system"))
                .collect(toList());
    }
}
