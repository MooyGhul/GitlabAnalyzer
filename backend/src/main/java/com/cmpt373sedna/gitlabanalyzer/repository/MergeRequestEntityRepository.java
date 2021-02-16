package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestEntityRepository extends CrudRepository<MergeRequestEntity, Integer> {
    @Query("SELECT mr FROM MergeRequestEntity mr WHERE mr.authorId = ?1")
    List<MergeRequestEntity> getUserMergeRequests(String authorId);
}
