package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ScoringTest {

    private DiffScore diffScore = new DiffScore();

    private List<String> diffs;

    @BeforeEach
    void setup() {
        diffs = new ArrayList<>();
    }

    @Test
    void addOnlyScore() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n" +
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "+    private String createdBy;\n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(1.0, score);
    }

    @Test
    void emptyLineScore() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n" +
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "     private @Nullable String createdBy;\n" +
                "+                                       \n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Test
    void deleteOnlyScore() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n" +
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "-    private @Nullable String createdBy;\n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.2, score);
    }

    @Test
    void deleteAndAddScore() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n" +
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "-    private @Nullable String createdBy;\n" +
                "+    private String createdBy;\n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n" +
                "@@ -35,6 +35,7 @@ public class CommentEntity {\n" +
                "                 .commentId(json.getInt(\"id\"))\n" +
                "                 .MRorIssueId(json.getInt(\"MRorIssueId\"))\n" +
                "                 .projectId(json.getInt(\"project_id\"))\n" +
                "+                .createdBy(json.getString(\"created_by\"))\n" +
                "                 .MRorIssueName(json.getString(\"MRorIssueName\"))\n" +
                "                  .commenter(json.getJSONObject(\"author\").getString(\"username\"))\n"+
                "                  .commentType(json.getString(\"noteable_type\"))");

        double score = diffScore.calcScore(diffs);

        assertEquals(1.2, score);
    }

    @Test
    void calcCommentScore() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n"+
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "-    //private @Nullable String createdBy;\n" +
                "+    //private String createdBy;\n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Test
    void calcValidLineWithComment() {
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\n"+
                "     private int projectId;\n" +
                "     private int MRorIssueId;\n" +
                "     private int wordCount;\n" +
                "-    private @Nullable String createdBy; // This is a comment \n" +
                "+    private String createdBy; // This is a comment \n" +
                "     @Column(columnDefinition=\"text\")\n" +
                "     private @Nullable String commentText;\n" +
                "     private @Nullable String commenter;\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.2, score);
    }

    @Test
    void stringDiffTest() {
        diffs.add("@@ -28,7 +28,7 @@ const CommentContributionPage = (props) => {\n" +
                "     useEffect(() => {\n" +
                "         const fetchData = async () => {\n" +
                "             const commentResult = await axios.get(\n" +
                "-                `http://localhost:8080/project/${project_id}/member/${member_id}/comments`\n" +
                "+                `/project/${project_id}/member/${member_id}/comments`\n" +
                "             );\n" +
                "             setComments(commentResult.data);\n" +
                "             const commentCounts = getGraphData(commentResult.data);");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.2, score);
    }

    @Test
    void twoDistinctChanges() {
        diffs.add("\"@@ -1,38 +1,24 @@\n" +
                "-import React from 'react';   \n" +
                "+    <div className={styles.body}>\n" +
                "+      <img\n" +
                "+        src=\"https://img.icons8.com/dusk/64/000000/sudoku.png\"\n" +
                "+        alt=\"avatar\"\n" +
                "+        className={styles.avatar}\n" +
                "+      />");

        double score = diffScore.calcScore(diffs);

        assertEquals(6.2, score);
    }

    @Test
    void syntaxOnlyTest() {
        diffs.add("{\n" +
                "+\t{\n" +
                "+\t\t{}\n" +
                "+\t}\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0.6, score);
    }

}
