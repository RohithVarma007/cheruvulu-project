package com.cheruvullu.start.dto;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PondOverviewDTO {

    private Long pondId;
    private String pondName;
    
    private Double totalInvestment;

    private Double presentRohu;
    private Double presentKatla;

    private Integer totalFeedShrimp;
    private Integer latestCount;

    private Double previousRohu;
    private Double previousKatla;
    
    private String cropType;
    private LocalDate startDate;
}
