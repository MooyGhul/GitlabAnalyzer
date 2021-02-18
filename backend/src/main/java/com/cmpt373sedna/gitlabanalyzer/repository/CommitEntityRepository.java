package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommitEntityRepository extends CrudRepository<CommitEntity, Long> {

    List<CommitEntity> findAllByAuthor(String author);
}
