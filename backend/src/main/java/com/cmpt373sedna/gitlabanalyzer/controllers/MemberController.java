package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommentEntity;
import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.CommentEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.CommitEntityRepository;
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

    @GetMapping("/{memberName}/comments")
    Iterable<CommentEntity> getMemberComments(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.commentEntityRepository.findAllByProjectIdAndCommenter(projectId, author);
    }
}
