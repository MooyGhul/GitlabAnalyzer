package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface IssueEntityRepository extends CrudRepository<IssueEntity, Integer> {
    @Query("SELECT i FROM IssueEntity i WHERE i.assignee = ?1")
    List<IssueEntity> getUserIssues(String assignee);
}
