package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestEntityRepository extends CrudRepository<MergeRequestEntity, Integer> {

    List<MergeRequestEntity> findAllByProjectId(int id);

}
