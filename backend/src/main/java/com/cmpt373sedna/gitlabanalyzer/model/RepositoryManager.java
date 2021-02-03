package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RepositoryManager {
    private List<String> allRepositories;
    private List<String> selectedRepositories;

    public RepositoryManager(List<String> allRepositories) {
        this.allRepositories = allRepositories;
        this.selectedRepositories = new ArrayList<String>();
    }

    public void selectRepositories(List<Integer> repoIndices) {
        String selectedRepo = null;
        for (Integer i: repoIndices) {
            selectedRepo = allRepositories.get(i);
            selectedRepositories.add(selectedRepo);
        }
    }

}
