package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProjectControllerTest {
    @Mock
    private ConfigEntity configEntity;

    @Mock
    private Extractor extractor;

    private final ProjectEntity projectEntity = new ProjectEntity(1, "repository", 19, 22, 33);

    @Test
    void canGetCorrectJavaFileScore() {
        ProjectController projectController = new ProjectController(extractor, configEntity, projectEntity);
        List<String> diffs = new ArrayList<>();
        diffs.add("@@ -21,7 +21,7 @@ public class CommentEntity {\\n     " +
                "private int projectId;\\n     private int MRorIssueId;\\n     " +
                "private int wordCount;\\n-    private @Nullable String createdBy;\\n+    private String createdBy;\\n     " +
                "@Column(columnDefinition=\\\"text\\\")\\n     private @Nullable String commentText;\\n     " +
                "private @Nullable String commenter;\\n@@ -35,6 +35,7 @@ public class CommentEntity {\\n                 " +
                ".commentId(json.getInt(\\\"id\\\"))\\n                 " +
                ".MRorIssueId(json.getInt(\\\"MRorIssueId\\\"))\\n                 " +
                ".projectId(json.getInt(\\\"project_id\\\"))\\n+                .createdBy(json.getString(\\\"created_by\\\"))\\n                 " +
                ".MRorIssueName(json.getString(\\\"MRorIssueName\\\"))\\n                 " +
                ".commenter(json.getJSONObject(\\\"author\\\").getString(\\\"username\\\"))\\n                 " +
                ".commentType(json.getString(\\\"noteable_type\\\"))\\n");

        double score = projectController.calcScore(diffs);

        assertEquals(1.8, score);
    }

}
