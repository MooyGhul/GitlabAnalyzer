package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.MemberEntity;
import org.springframework.data.repository.CrudRepository;

public interface MemberEntityRepository extends CrudRepository<MemberEntity, String> {
}
