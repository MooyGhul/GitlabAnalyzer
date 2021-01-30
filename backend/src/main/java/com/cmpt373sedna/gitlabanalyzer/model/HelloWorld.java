package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HelloWorld {
    private String hello;
    private String world;
}
