package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Entity
@Data
@Builder
public class ProjectEntity {
    private @Getter
    @Id int repoId;
    private @Getter String repoName;
    private @Getter int numCommits;
    private @Getter int numMR;
    private @Getter int numComments;
    @Builder.Default
    private @Getter String lastSync = "1970-01-01T00:00Z";

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;
    }

    public ProjectEntity() {
        this.repoId = -1;
        this.repoName = "";
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
    }

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments, String lastSync) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;
    }

    //code from: https://stackoverflow.com/questions/3914404/how-to-get-current-moment-in-iso-8601-format-with-date-hour-and-minute
    public String getCurrentTime() {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date());
        return nowAsISO;
    }
}
