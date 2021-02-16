package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.repository.CrudRepository;

public interface CommitEntityRepository extends CrudRepository<CommitEntity, Integer> {
}
