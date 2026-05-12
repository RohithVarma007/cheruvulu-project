package com.cheruvullu.start.entity;

import java.time.LocalDate;

import com.cheruvullu.start.constants.EventType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DailyEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pond_id")
    private Pond pond;

    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private EventType eventType;
    private String eventNote;
    private Integer labourCount;
}