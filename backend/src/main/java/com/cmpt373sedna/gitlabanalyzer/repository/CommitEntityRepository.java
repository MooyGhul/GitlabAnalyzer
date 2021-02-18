package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommitEntityRepository extends CrudRepository<CommitEntity, Long> {

    //@Query("SELECT c FROM CommitEntity c WHERE c.author = ?1")
    List<CommitEntity> findAllByAuthor(String author);
}
