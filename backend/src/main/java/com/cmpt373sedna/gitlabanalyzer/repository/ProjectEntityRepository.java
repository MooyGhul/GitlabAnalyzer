package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProjectEntityRepository extends CrudRepository<ProjectEntity, Integer> {
}
