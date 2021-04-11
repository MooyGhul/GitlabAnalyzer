package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectEntityRepository extends CrudRepository<ProjectEntity, Integer> {
    ProjectEntity findProjectEntityByRepoId(int id);
    @Query(value="UPDATE project_entity " +
                 "SET lastSync = :lastSync " +
                 "WHERE repoId = :id", nativeQuery = true)
    ProjectEntity updateLastSync(int id, String lastSync);
}
