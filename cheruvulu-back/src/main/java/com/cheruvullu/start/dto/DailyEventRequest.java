package com.cheruvullu.start.dto;

import java.time.LocalDate;

import com.cheruvullu.start.constants.EventType;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DailyEventRequest {

    @NotNull(message = "Pond ID is required")
    private Long pondId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private EventType eventType; // optional

    @Min(value = 0, message = "Labour count cannot be negative")
    private Integer labourCount;

    private Integer rohu;
    private Integer katla;
    private Integer dayCount;

    @Size(max = 255, message = "Event note too long")
    private String eventNote;

    private Double feed7am;
    private Double feed10am;
    private Double feed1pm;
    private Double feed4pm;

    private Integer rohuDead;
    private Integer katlaDead;
    private Integer dobBags;

}