package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.Commit;
import org.springframework.data.repository.CrudRepository;

public interface CommitRepository extends CrudRepository<Commit, Integer> {
}
