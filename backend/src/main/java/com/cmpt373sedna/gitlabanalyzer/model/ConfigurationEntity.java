package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ConfigurationEntity {
    private @Getter @Id String token;
    @ElementCollection
    private @Getter List<String> configurations;

    public static ConfigurationEntity fromGitlabJSON(JSONObject json) {

        List<String> configList = getLanguageWeights(json);
        return ConfigurationEntity.builder()
                .token(json.getString("token"))
                .configurations(configList)
                .build();
    }

    private static List<String> getLanguageWeights(JSONObject newConfig) {
        List<String> newConfigList = new ArrayList<>();
        JSONObject config = (JSONObject) newConfig.getJSONArray("configurations").get(0);
        newConfigList.add(config.toString());
        return newConfigList;
    }
}
