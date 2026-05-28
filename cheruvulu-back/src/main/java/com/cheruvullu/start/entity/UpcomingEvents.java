package com.cheruvullu.start.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpcomingEvents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String note;
    private String type;

    @ManyToOne
    @JoinColumn(name = "pond_id")
    private Pond pond;

}
