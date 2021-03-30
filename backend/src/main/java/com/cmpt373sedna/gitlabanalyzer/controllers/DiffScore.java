package com.cmpt373sedna.gitlabanalyzer.controllers;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class DiffScore {

    public double calcScore(List<String> diffs) {
        List<String> lines = new ArrayList<>();
        for(String diff: diffs) {
            // Add anything that's not a empty newline, or empty syntax additions/deletions
            lines.addAll(Arrays.stream(diff.split("\n")).filter(line ->
                    (line.startsWith("-") || line.startsWith("+")) && (line.trim().length() > 1) && !(line.matches("[-+]\\s*//.*"))
            ).collect(toList()));
        }

        return parseScore(lines);
    }

    private double parseScore(List<String> lines) {
        double score = 0;
        Iterator<String> itr = lines.iterator();
        String prev = "";

        if(itr.hasNext()) {
            prev = itr.next();
            if(prev.startsWith("+")) {
                if(prev.matches("|[+-]\\s*[{}()]{1,2}\\s*")) {
                    score += 0.2;
                } else {
                    score++;
                }
            } else {
                score+= 0.2;
            }

        }

        while(itr.hasNext()) {
            String current = itr.next();
            int shortestString = Math.min(current.trim().length(), prev.trim().length());
            if(current.startsWith("+")) {
                if(current.matches("|[+-]\\s*[{}()]{1,2}\\s*")) {
                    score += 0.2;
                }
                else if(prev.startsWith("+")) {
                    score++;
                } else if(StringUtils.getLevenshteinDistance(current.substring(1), prev.substring(1)) > shortestString){
                    score++;
                }
            } else {
                score += 0.2;
            }

            prev = current;
        }

        return Math.round(score * 100.0)/100.0;
    }
}
