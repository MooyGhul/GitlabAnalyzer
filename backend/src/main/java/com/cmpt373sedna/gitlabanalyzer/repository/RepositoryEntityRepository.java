package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.RepositoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface RepositoryEntityRepository extends CrudRepository<RepositoryEntity, Integer> {
}
