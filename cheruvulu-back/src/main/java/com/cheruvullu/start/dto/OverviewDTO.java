package com.cheruvullu.start.dto;

import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OverviewDTO {

    private Double grandTotalInvestment;
    private List<PondOverviewDTO> ponds;

}
