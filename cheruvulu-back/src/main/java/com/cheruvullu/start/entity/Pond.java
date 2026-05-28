package com.cheruvullu.start.entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String cropType;      // "Fish" | "Shrimp"
    private Double totalInvestment;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer rohuStock;
    private Integer KatlaStock;
    private Integer leftStock;
    private Integer totalFeedShrimp;
    private Integer RohuDead;
    private Integer KatlaDead;
    private Integer dobBags;
}