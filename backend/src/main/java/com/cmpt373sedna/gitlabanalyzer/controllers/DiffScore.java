package com.cmpt373sedna.gitlabanalyzer.controllers;


import java.util.*;

import static java.util.stream.Collectors.toList;

public class DiffScore {

    private HashMap<String, List<String>> commentStyles = new HashMap<String ,List<String>>() {{
        put("Python", Collections.singletonList("#"));
        put("Javascript", Collections.singletonList("//"));
        put("C++", Arrays.asList("//", "\\/\\* \\*\\/"));
        put("Java", Arrays.asList("//", "\\/\\* \\*\\/"));
        put("SQL", Collections.singletonList("--"));
        put("HTML", Collections.singletonList("<!-- -->"));
    }};

    private HashMap<String, String> parsedLines;

    private String language = "Java";
    private String singleLineComment;
    private String multiLineStartComment;
    private String multiLineEndComment;

    public double calcScore(List<String> diffs) {
        List<String> deletedLines = new ArrayList<>();
        List<String> additionLines = new ArrayList<>();
        List<String> lines = new ArrayList<>();

        getCommentCharacters(language);
        String multiLineCommentRegex = "[-+]\\s*?(" + multiLineStartComment + ")(.|\n)*?(" + multiLineEndComment + ")\\s*?\n";
        String singleLineCommentRegex = "[-+]\\s*" + singleLineComment +".*";

        for(String diff: diffs) {
            diff = diff.replaceAll(multiLineCommentRegex, "");
            // Add anything that's not a empty newline, or comment
            lines.addAll(Arrays.stream(diff.split("\n")).filter(line ->
                    (line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches(singleLineCommentRegex))
            ).collect(toList()));
        }

        for(String line : lines) {
            if(line.startsWith("-")) {
                deletedLines.add(line.substring(1));
            } else {
                additionLines.add(line.substring(1));
            }
        }

        List<String> duplicates = findDuplicates(additionLines, deletedLines);
        lines.removeIf(line -> duplicates.contains(line.substring(1)));

        return parseScore(additionLines, deletedLines);
    }

    private double parseScore(List<String> added, List<String> deleted) {
        List<String> duplicates = findDuplicates(added, deleted);
        added.removeAll(duplicates);
        deleted.removeAll(duplicates);

        double score = getScore(added, true);
        score += getScore(deleted, false);

        return Math.round(score * 100.0)/100.0;
    }

    private double getScore(List<String> lines, boolean wasAdded) {
        double score = 0;

        for (String current : lines) {
            if (wasAdded) {
                if (current.matches("\\s*[{}()]{1,2}\\s*")) {
                    score += 0.2;
                } else {
                    score++;
                }
            } else {
                score += 0.2;
            }
        }
        return score;
    }

    private List<String> findDuplicates(List<String> added, List<String> deleted) {
        return added.stream().filter(deleted::contains).collect(toList());
    }

    private void getCommentCharacters(String language) {
        if(commentStyles.get(language).size() > 1) {
            singleLineComment = commentStyles.get(language).get(0);
            multiLineStartComment = commentStyles.get(language).get(1).split(" ")[0];
            multiLineEndComment = commentStyles.get(language).get(1).split(" ")[1];
        } else {
            singleLineComment = commentStyles.get(language).get(0);
            multiLineStartComment = "";
            multiLineEndComment = "";
        }
    }
}
