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
import java.util.stream.Collectors;

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
                .collect(Collectors.toList());
    }

    public ProjectEntity getProject(ConfigEntity config, String projectId) {
        JSONObject projectJSON = getJsonObject(buildUri(config, projectId));

        return ProjectEntity.builder()
                .repoId(projectJSON.getInt("id"))
                .repoName(projectJSON.getString("name"))
                .build();
    }

    public List<JSONObject> getMergeRequests(ConfigEntity config, int projectId) {
        return getJsonObjectsList(buildUri(config, projectId, "merge_requests"));
    }

    public List<JSONObject> getMergeRequestComments(ConfigEntity config, int projectId, int mergeRequestId) {
        List<JSONObject> mergeRequests = getJsonObjectsList(buildUri(config, projectId, "merge_requests/" + mergeRequestId + "/notes"));
        for(JSONObject mr : mergeRequests) {
            mr.put("commentType", "merge_request");
        }
        return mergeRequests;
    }

    public List<JSONObject> getIssues(ConfigEntity config, int projectId) {
        return getJsonObjectsList(buildUri(config, projectId, "issues"));
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
        return commits;
    }

    public List<JSONObject> getIssueComments(ConfigEntity config, int projectId, int issueId) {
        List<JSONObject> comments = getJsonObjectsList(buildUri(config, projectId, "issues/" + issueId + "/notes"));
        for(JSONObject comment : comments) {
            comment.put("commentType", "issue");
        }
        return comments;
    }

    public List<String> getRepoMembers(ConfigEntity config, int projectId) {
        List<JSONObject> membersJson = getJsonObjectsList(buildUri(config, projectId, "members"));

        return membersJson.stream()
                .map(obj -> obj.getString("username"))
                .collect(Collectors.toList());
    }

    private URI buildUri(ConfigEntity config, int projectId, String path) {
        return URI.create(config.getUrl() + "api/v4/projects/" + projectId + "/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
    }

    private URI buildUri(ConfigEntity config, int projectId) {
        return URI.create(config.getUrl() + "api/v4/projects/" + projectId + "?access_token=" + config.getToken());
    }

    private URI buildUri(ConfigEntity config, String path) {
        return URI.create(config.getUrl() + "api/v4/projects/ "+ path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
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
}
