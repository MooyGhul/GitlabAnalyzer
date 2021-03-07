package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestDiffsVersionsRepository extends CrudRepository<MergeRequestDiffVersionsEntity, Integer> {

    List<MergeRequestDiffVersionsEntity> findAllByProjectIdAndMRIid(int id, int MRIid);

}
