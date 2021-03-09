package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestDiffsRepository extends CrudRepository<MergeRequestDiffsEntity, Integer> {
    List<MergeRequestDiffsEntity> findAllByProjectIdAndAuthorName(int id, String authorName);
    List<MergeRequestDiffsEntity> findSpecificDiffByAuthorName(int id, int MRId, int versionId);
}
