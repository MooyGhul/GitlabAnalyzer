package com.cmpt373sedna.gitlabanalyzer.controllers;


import java.util.*;

import static java.util.stream.Collectors.toList;

public class DiffScore {

    private HashMap<String, List<String>> commentStyles = new HashMap<String ,List<String>>() {{
        put("Python", Collections.singletonList("#"));
        put("Javascript", Collections.singletonList("//"));
        put("C++", Arrays.asList("\\/\\/", "\\/\\* \\*\\/"));
        put("Java", Arrays.asList("\\/\\/", "\\/\\* \\*\\/"));
        put("SQL", Collections.singletonList("--"));
        put("HTML", Collections.singletonList("<!-- -->"));
    }};

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
            for(String line: diff.split("\n")) {
                if((line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches(singleLineCommentRegex))) {
                    String replace = line.substring(1).replaceAll(singleLineComment + ".*", "");
                    if(line.startsWith("-")) {
                        deletedLines.add(replace);
                    } else {
                        additionLines.add(replace);
                    }
                    lines.add(line.split(singleLineComment)[0]);
                }
            }
        }

        List<String> duplicates = findDuplicates(additionLines, deletedLines);
        lines.removeIf(line -> duplicates.contains(line.substring(1)));
        return getScore(lines);
    }

    private double getScore(List<String> lines) {
        double score = 0;

        for (String current : lines) {
            // syntax checking
            if (current.substring(1).matches("\\s*[{}()]{1,2}\\s*")) {
                score += 0.2;
            } else {
                if (current.startsWith("+")) {
                    score++;

                } else {
                    score += 0.2;
                }
            }
        }
        return Math.round(score * 100.0)/100.0;
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
