package com.cheruvullu.start.entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class HarvestHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pond_id")
    private Pond pond;

    private LocalDate date;
    private Double tonnes;
    private Integer count;
    private Double pricePerKg;
    private Double revenue;
    private String harvestType;   // "MIDDLE" | "FINAL"
}