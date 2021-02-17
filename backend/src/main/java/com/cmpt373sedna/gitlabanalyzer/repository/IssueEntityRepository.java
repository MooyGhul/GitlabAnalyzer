package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import org.springframework.data.repository.CrudRepository;

public interface IssueEntityRepository extends CrudRepository<IssueEntity, Integer> {
}
