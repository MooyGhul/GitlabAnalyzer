package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestDiffsRepository extends CrudRepository<MergeRequestDiffsEntity, Integer> {
    List<MergeRequestDiffsEntity> findAllByProjectIdAndMRIidAndVersionId(int projectId, int merge_request_iid, int versionId);
    List<MergeRequestDiffsEntity> findAllByProjectIdAndMRIidAndAuthorName(int id, int MRIid, String authorName);
}
