package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConfigurationEntityTest {

    @Test
    void fromGitlabJSON_parses_ConfigEntity_correctly() throws IOException {
        JSONObject testConfig = new JSONObject();
        testConfig.put("Javascript", 1.2);
        testConfig.put("CSS", 0.4);

        JSONObject testIteration = new JSONObject();
        testIteration.put("name","test_config");
        testIteration.put("startDate","2013-10-02T09:22:45Z");
        testIteration.put("endDate","2013-10-02T10:22:45Z");

        IterationConfigurationEntity expectedIteration = IterationConfigurationEntity.builder()
                .token("test1")
                .iterationName("test_iteration")
                .startDate(Instant.parse("2013-10-02T09:22:45Z"))
                .endDate(Instant.parse("2013-10-02T10:22:45Z"))
                .build();

        WeightConfigurationEntity expectedConfiguration = WeightConfigurationEntity.builder()
                .token("test1")
                .configuration(testConfig.toString())
                .build();

        String weightJson = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleWeightConfigurationEntity.json").readAllBytes());
        String iterationJson = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleIterationConfiguration.json").readAllBytes());

        JSONObject iterationObj = new JSONObject(iterationJson);
        JSONObject weightObj = new JSONObject(weightJson);

        IterationConfigurationEntity actualIteration = IterationConfigurationEntity.fromGitlabJSON(iterationObj);
        WeightConfigurationEntity actualConfiguration = WeightConfigurationEntity.fromGitlabJSON(weightObj);

        assertEquals(expectedConfiguration, actualConfiguration);
        assertEquals(expectedIteration, actualIteration);
    }
}
