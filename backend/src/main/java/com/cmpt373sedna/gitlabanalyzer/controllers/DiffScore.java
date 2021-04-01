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
        Map<String, String> lines = new HashMap<>();

        getCommentCharacters(language);
        String multiLineCommentRegex = getMultiLineCommentRegex();
        String singleLineCommentRegex = getSingleLineCommentRegex();

        for(String diff: diffs) {
            diff = diff.replaceAll(multiLineCommentRegex, "");
            for(String line: diff.split("\n")) {
                if((line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches(singleLineCommentRegex))) {
                    String replace = removeInlineComments(line);
                    if(line.startsWith("-")) {
                        deletedLines.add(replace);
                        lines.put(replace, "-");
                    } else {
                        additionLines.add(replace);
                        lines.put(replace, "+");
                    }

                }
            }
        }

        List<String> duplicates = findDuplicates(additionLines, deletedLines);
        lines.keySet().removeIf(duplicates::contains);
        return getScore(lines);
    }

    private double getScore(Map<String, String> lines) {
        double score = 0;

        for (String current : lines.keySet()) {
            if (current.substring(1).matches("\\s*[{}()]{1,2}\\s*")) {
                score += 0.2;
            } else {
                if (lines.get(current).equals("+")) {
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

    private String getMultiLineCommentRegex() {
        return "[-+]\\s*?(" + multiLineStartComment + ")(.|\n)*?(" + multiLineEndComment + ")\\s*?\n";
    }

    private String getSingleLineCommentRegex() {
        return "[-+]\\s*" + singleLineComment +".*";
    }

    private String removeInlineComments(String line) {
        String result = line.substring(1).replaceAll(singleLineComment + ".*", "");
        return result.replaceAll("\\s*" + multiLineStartComment + ".*?" + multiLineEndComment + "\\s*", " ");
    }
}