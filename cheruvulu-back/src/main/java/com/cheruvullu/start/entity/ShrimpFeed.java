package com.cheruvullu.start.entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShrimpFeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pond_id")
    private Pond pond;

    private LocalDate date;
    private Double feed7am;
    private Double feed10am;
    private Double feed1pm;
    private Double feed4pm;
    private Integer shrimpCount;
}