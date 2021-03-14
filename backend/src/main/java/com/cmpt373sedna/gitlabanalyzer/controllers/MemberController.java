package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommentEntity;
import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommentEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestDiffsEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestDiffsRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestDiffsVersionsRepository;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.MergeRequestEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{projectId}/member")
public class MemberController {

    @Autowired
    private CommentEntityRepository commentEntityRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestDiffsVersionsRepository mergeRequestDiffVersionRepository;

    @Autowired
    private MergeRequestDiffsRepository mergeRequestDiffRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestRepository;


    @GetMapping("/{memberName}/commits")
    Iterable<CommitEntity> getMemberCommits(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
    }

    @GetMapping("/{memberName}/merge_requests")
    Iterable<MergeRequestEntity> getMemberMergeRequest(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.mergeRequestRepository.findAllByProjectIdAndAuthor(projectId, author);
    }

    @GetMapping("/{memberName}/comments")
    Iterable<CommentEntity> getMemberComments(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.commentEntityRepository.findAllByProjectIdAndCommenter(projectId, author);
    }
    @GetMapping("/{authorName}/merge_requests/{merge_request_iid}/versions")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffVersions(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid, @PathVariable(value = "authorName") String authorName) {
        return this.mergeRequestDiffRepository.findAllByProjectIdAndMRIidAndAuthorName(projectId, MRIid, authorName);
    }

    @GetMapping("/merge_requests/{merge_request_iid}/diffId/{versionId}")
    Iterable<MergeRequestDiffsEntity> getMergeRequestDiffs(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "merge_request_iid") int MRIid, @PathVariable(value = "versionId") int versionId) {
        return this.mergeRequestDiffRepository.findAllByProjectIdAndMRIidAndVersionId(projectId, MRIid, versionId);
    }
}
