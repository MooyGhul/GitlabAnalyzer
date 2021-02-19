package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CodeContributionHistory;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MergeRequestEntityRepository extends CrudRepository<MergeRequestEntity, Integer> {

    List<MergeRequestEntity> findAllByProjectId(int id);
    List<MergeRequestEntity> findAllByAuthor(String author);

    @Query("SELECT new CodeContributionHistory(commitCounts.commitCount, mrCounts.mrCount, 0, date)" +
            "FROM (SELECT Count(mr), mr.mergedAt as mrCount FROM merge_request_entity mr GROUP BY mr.mergedAt) as mrCounts" +
            "        LEFT JOIN (SELECT Count(c), c.commitDate as commitCount FROM CommitEntity c GROUP BY c.commitDate) as commitCounts" +
            "        ON mrCounts.mergedAt == commitCounts.commitDate", nativeQuery = true)
    List<CodeContributionHistory> findContributions();
}