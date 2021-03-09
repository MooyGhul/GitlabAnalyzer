package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffVersionsEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestDiffsRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestDiffsVersionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{projectId}/member")
public class MemberController {

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestDiffsVersionsRepository mergeRequestDiffVersionRepository;

    @Autowired
    private MergeRequestDiffsRepository mergeRequestDiffRepository;

    @GetMapping("/{memberName}/commits")
    Iterable<CommitEntity> getMemberCommits(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        Iterable<CommitEntity> m = this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
        return this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
    }

    @GetMapping("/{memberName}/merge_requests")
    Iterable<CommitEntity> getMemberMergeRequest(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        Iterable<CommitEntity> m = this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
        return this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
    }
    @GetMapping("/{authorName}/merge_requests/{merge_request_iid}/versions")
    Iterable<MergeRequestDiffVersionsEntity> getMergeRequestDiffVersions(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid, @PathVariable(value = "authorName") String authorName) {
        Iterable<MergeRequestDiffVersionsEntity> m = this.mergeRequestDiffVersionRepository.findAllVersionsByProjectIdMRIidAndAuthor(projectId, MRIid, authorName);
        return this.mergeRequestDiffVersionRepository.findAllVersionsByProjectIdMRIidAndAuthor(projectId, MRIid, authorName);
    }

    @GetMapping("/{authorName}/merge_requests/{merge_request_iid}/diffId/{versionId}")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffs(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid, @PathVariable(value = "versionId") int versionId) {
        Iterable<MergeRequestDiffsEntity> m = this.mergeRequestDiffRepository.findSpecificDiffByAuthorName(projectId, MRIid, versionId);
        return this.mergeRequestDiffRepository.findSpecificDiffByAuthorName(projectId, MRIid, versionId);
    }

    @GetMapping("/{authorName}/merge_requests")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffsByAuthor(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "authorName") String authorName) {
        Iterable<MergeRequestDiffsEntity> m = this.mergeRequestDiffRepository.findAllByProjectIdAndAuthorName(projectId, authorName);
        return this.mergeRequestDiffRepository.findAllByProjectIdAndAuthorName(projectId, authorName);
    }
}
