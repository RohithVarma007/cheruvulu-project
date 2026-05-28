package com.cheruvullu.start.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddPondRequest {

    private Long pondId;

    private String cropType;

    private LocalDate startDate;

    // fish
    private Integer rohuStock;
    private Integer katlaStock;

    // optional
    private Integer dobBags;

    // fish grams
    private Integer rohuGrams;
    private Integer katlaGrams;
}