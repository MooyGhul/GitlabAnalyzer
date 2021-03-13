package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.notNullValue;

@ExtendWith(SpringExtension.class)
class ExtractorTest {
    @InjectMocks
    private Extractor extractor;

    private ConfigEntity testConfig = ConfigEntity.builder()
            .url("http://cmpt373-1211-14.cmpt.sfu.ca:8929/")
            .token("XQUSyUSDiQUxsy6CoP8_")
            .build();

    @Test
    void canGetProjects() {
        assertThat(this.extractor.getProjects(this.testConfig), hasItem(notNullValue(ProjectEntity.class)));
    }

    @Test
    void canGetMergeRequests() {
        assertThat(this.extractor.getMergeRequests(this.testConfig, 2), hasItem(notNullValue(JSONObject.class)));
    }

    @Test
    void canGetMergeRequestComments() {
        assertThat(this.extractor.getMergeRequestComments(this.testConfig, 2, 1), hasItem(notNullValue(JSONObject.class)));
    }

    @Test
    void canGetIssues() {
        assertThat(this.extractor.getIssues(this.testConfig, 2), hasItem(notNullValue(JSONObject.class)));
    }

    @Test
    void canGetCommits() {
        assertThat(this.extractor.getCommits(this.testConfig, 2), hasItem(notNullValue(JSONObject.class)));
    }

    @Test
    void canGetIssueCommits() {
        assertThat(this.extractor.getIssueComments(this.testConfig, 2, 1), hasItem(notNullValue(JSONObject.class)));
    }

    @Test
    void canGetRepoMembers() {
        assertThat(this.extractor.getRepoMembers(this.testConfig, 2), hasItem(notNullValue(String.class)));
    }
}