package com.cheruvullu.start.entity;

import java.time.LocalDate;

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
    @Column(columnDefinition = "TEXT")
    private String eventType;
    private String eventNote;
    private Integer labourCount;
}