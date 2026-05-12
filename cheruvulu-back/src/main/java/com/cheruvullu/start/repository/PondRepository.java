package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondRepository extends JpaRepository<Pond, Long> {
    List<Pond> findByCropType(String cropType);


    @Query("SELECT p FROM Pond p WHERE p.startDate IS NOT NULL")
    List<Pond> findByStartDateIsNotNull();

}