package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectEntityRepository extends CrudRepository<ProjectEntity, Integer> {
    @Query(value="SELECT repo_name " +
            "FROM project_entity " +
            "WHERE repo_id = :projectId ", nativeQuery = true)
    String findProjectName(int projectId);
}
