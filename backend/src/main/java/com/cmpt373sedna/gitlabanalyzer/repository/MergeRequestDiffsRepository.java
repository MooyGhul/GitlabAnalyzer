package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestDiffsRepository extends CrudRepository<MergeRequestDiffsEntity, Integer> {
    List<MergeRequestDiffsEntity> findAllByProjectIdAndAuthorName(int projectId, String authorName);
    //List<MergeRequestDiffsEntity> findAllByProjectIdAndMerge_request_iidAndVersionId(int projectId, int merge_request_iid, int versionId);
    List<MergeRequestDiffsEntity> findAllByProjectIdAndMergerequestiidAndAuthorName(int id, int merge_request_iid, String authorName);
}
