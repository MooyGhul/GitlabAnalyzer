package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestDiffsVersionsRepository extends CrudRepository<MergeRequestDiffVersionsEntity, Integer> {

    //List<MergeRequestDiffVersionsEntity> findAllByProjectIdAndMerge_request_iidAndAuthorName(int id, int merge_request_iid, String authorName);

    /*
    @Query(value="SELECT * FROM (SELECT Count(mr) AS mrCount, mr.merged_at FROM merge_request_entity mr WHERE mr.project_id = :projectId GROUP BY mr.merged_at) as mrCounts" +
            "        LEFT JOIN (SELECT Count(c) AS commitCount, c.commit_date FROM commit_entity c WHERE c.project_id = :projectId GROUP BY c.commit_date) as commitCounts" +
            "        ON mrCounts.merged_at = commitCounts.commit_date", nativeQuery = true)*/

}
