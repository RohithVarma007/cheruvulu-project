package com.cheruvullu.start.dto;

import java.util.List;

import com.cheruvullu.start.entity.UpcomingEvents;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OverviewDTO {

    private Double grandTotalInvestment;
    private List<PondOverviewDTO> ponds;
    private List<UpcomingEvents> events;

}
