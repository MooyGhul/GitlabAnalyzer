package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.Repository;
import org.springframework.data.repository.CrudRepository;

public interface RepositoryRepository extends CrudRepository<Repository, Long> {
}
