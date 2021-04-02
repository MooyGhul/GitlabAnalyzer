package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.json.JSONObject;

import java.util.*;

import static java.util.stream.Collectors.toList;

public class DiffScore {

    private final HashMap<String, List<String>> commentStyles = new HashMap<String ,List<String>>() {{
        put("py", Collections.singletonList("#"));
        put("sh", Collections.singletonList("#"));
        put("js",  Arrays.asList("\\/\\/", "\\/\\* \\*\\/"));
        put("cpp", Arrays.asList("\\/\\/", "\\/\\* \\*\\/"));
        put("java", Arrays.asList("\\/\\/", "\\/\\* \\*\\/"));
        put("SQL", Collections.singletonList("--"));
        put("html", Arrays.asList("<!-- -->", "<!-- -->"));
        put("txt", Collections.singletonList("#"));
        put("css",  Arrays.asList("\\/\\* \\*\\/", "\\/\\* \\*\\/"));
    }};

    private String singleLineComment;
    private String multiLineStartComment;
    private String multiLineEndComment;

    public double calcScore(List<String> stringDiffs) {
        double score = 0.0;

        for(String diff: stringDiffs) {
            JSONObject obj = new JSONObject(diff);
            if(!obj.getBoolean("renamed_file")) {
                String diffString = obj.getString("diff");
                String[] pathSplit = obj.getString("new_path").split("\\.");
                String language = pathSplit[pathSplit.length - 1];
                score += parseDiff(diffString, language);
            }
        }

       return Math.round(score * 100.0)/100.0;
    }

    private double parseDiff(String diff, String language) {
        List<String> deletedLines = new ArrayList<>();
        List<String> additionLines = new ArrayList<>();
        Map<String, String> lines = new HashMap<>();

        getCommentCharacters(language);
        String multiLineCommentRegex = getMultiLineCommentRegex();
        String singleLineCommentRegex = getSingleLineCommentRegex();


        diff = diff.replaceAll(multiLineCommentRegex, "");
        for(String line: diff.split("\n")) {
            if((line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches(singleLineCommentRegex))) {
                String replace = removeInlineComments(line).replaceAll(" ", "").trim();
                if(line.startsWith("-")) {
                    deletedLines.add(replace);
                    lines.put(replace, "-");
                } else {
                    additionLines.add(replace);
                    lines.put(replace, "+");
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
            if (current.matches("[{}()]{1,2}")) {
                score += 0.2;
            } else {
                if (lines.get(current).equals("+")) {
                    score++;

                } else {
                    score += 0.2;
                }
            }
        }
        return score;
    }

    private List<String> findDuplicates(List<String> added, List<String> deleted) {
        return added.stream().filter(deleted::contains).collect(toList());
    }

    private void getCommentCharacters(String language) {
        if(commentStyles.containsKey(language)) {
            if(commentStyles.get(language).size() > 1) {
                singleLineComment = commentStyles.get(language).get(0);
                multiLineStartComment = commentStyles.get(language).get(1).split(" ")[0];
                multiLineEndComment = commentStyles.get(language).get(1).split(" ")[1];
            } else {
                singleLineComment = commentStyles.get(language).get(0);
                multiLineStartComment = "";
                multiLineEndComment = "";
            }
        } else {
            singleLineComment = "";
            multiLineStartComment = "";
            multiLineEndComment = "";
        }

    }

    private String getMultiLineCommentRegex() {
        if(multiLineStartComment.equals("") && multiLineEndComment.equals("")) {
            return "";
        }
        return "[-+]\\s*" + multiLineStartComment + "[\\s\\S]*?" + multiLineEndComment + "\\s*";
    }

    private String getSingleLineCommentRegex() {
        return "[-+]\\s*" + singleLineComment +".*";
    }

    private String removeInlineComments(String line) {
        String result = line.substring(1).replaceAll(singleLineComment + ".*", "");
        if(multiLineStartComment.equals("") && multiLineEndComment.equals("")) {
            return result;
        }
        return result.replaceAll("\\s*" + multiLineStartComment + ".*?" + multiLineEndComment + "\\s*", " ");
    }
}