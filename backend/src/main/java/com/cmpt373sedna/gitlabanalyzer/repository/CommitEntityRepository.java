package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CommitEntityRepository extends CrudRepository<CommitEntity, Long> {
    List<CommitEntity> findAllByProjectId(long id);
    List<CommitEntity> findAllByAuthor(String author);

}
