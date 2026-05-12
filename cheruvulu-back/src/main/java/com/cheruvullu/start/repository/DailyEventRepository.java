package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.DailyEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyEventRepository extends JpaRepository<DailyEvent, Long> {
    List<DailyEvent> findByPondId(Long pondId);
    List<DailyEvent> findByDateBetween(LocalDate start, LocalDate end);
    List<DailyEvent> findByPondIdAndDate(Long pondId, LocalDate date);
}