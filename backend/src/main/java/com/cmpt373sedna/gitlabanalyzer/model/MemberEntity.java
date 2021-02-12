package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Getter;
import org.json.JSONObject;

import javax.persistence.Id;

/**
 * Defines
 */
public class MemberEntity {
    private @Id @Getter String memberID;
    //TODO: add Commit class
    //TODO: add Issue Class
    //TODO: add Merge request
    private @Getter JSONObject commentDetails;
    private @Getter JSONObject codeContributionDetails;

    public MemberEntity(String memberID, JSONObject commentDetails, JSONObject codeContributionDetails) {
        this.memberID = memberID;
        this.commentDetails = commentDetails;
        this.codeContributionDetails = codeContributionDetails;
    }
}
