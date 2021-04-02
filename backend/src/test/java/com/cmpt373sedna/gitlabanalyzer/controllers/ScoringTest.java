package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ScoringTest {

    JSONParser parser = new JSONParser();

    private final DiffScore diffScore = new DiffScore();

    private List<String> diffs;

    private JSONArray jsonDiffs;

    @BeforeEach
    void setup() throws IOException, ParseException {
        diffs = new ArrayList<>();
        jsonDiffs =  (JSONArray) parser.parse(new FileReader("src/test/resources/json/gitlabApi/diffData.json"));
    }

    @Test
    void addOnlyScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(0);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(1.0, score);
    }


    @Test
    void emptyLineScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(6);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Test
    void deleteSingleLineScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(3);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.2, score);
    }

    @Test
    void deleteMultiLineScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(4);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.6, score);
    }

    @Test
    void deleteFilesScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(5);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(6.0, score);
    }


    @Test
    void deleteAndAddScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(7);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(1.4, score);
    }

    @Test
    void calcOneLineCommentScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(12);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Test
    void calcValidLineWithComment() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(14);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(1.2, score);
    }

    @Test
    void calcInlineCommentAddition() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(13);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0, score);
    }

    @Test
    void calcBlockCommentScore() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(11);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Disabled("Still need to add dynamic comment choice on input language")
    @Test
    void commentedHTMLCase() {
        diffs.add("+ <!-- Do not display this image at the moment\n" +
                "+ <img border=\"0\" src=\"pic_trulli.jpg\" alt=\"Trulli\">\n" +
                "+ -->\n");

        double score = diffScore.calcScore(diffs);

        assertEquals(0, score);
    }

    @Test
    void stringDiffTest() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(15);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(1.2, score);
    }

    @Test
    void twoDistinctChanges() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(10);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(8.4, score);
    }

    @Test
    void syntaxOnlyTest() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(1);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.6, score);
    }

    @Test
    void syntaxDeleteTest() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(2);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.6, score);
    }

    @Test
    void moveContentTest() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(9);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

    @Test
    void moveFile() {
        JSONObject newDiff = (JSONObject) jsonDiffs.get(8);
        diffs.add(newDiff.toString());

        double score = diffScore.calcScore(diffs);

        assertEquals(0.0, score);
    }

}
