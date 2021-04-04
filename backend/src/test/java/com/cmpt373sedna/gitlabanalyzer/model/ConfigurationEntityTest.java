package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConfigurationEntityTest {

    @Test
    void fromGitlabJSON_parses_ConfigEntity_correctly() throws IOException {
        List<String> configList = new ArrayList<>();
        JSONObject testConfig = new JSONObject();
        testConfig.put("Javascript", 1.2);
        testConfig.put("CSS", 0.4);

        JSONObject testObj = new JSONObject();
        testObj.put("name","test_config");
        testObj.put("startDate","2013-10-02T09:22:45Z");
        testObj.put("endDate","2013-10-02T10:22:45Z");
        testObj.put("weights",testConfig);
        configList.add(testObj.toString());

        ConfigurationEntity expected = ConfigurationEntity.builder()
                .token("test1")
                .configurations(configList)
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleConfigEntity.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        ConfigurationEntity actual = ConfigurationEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }
}
