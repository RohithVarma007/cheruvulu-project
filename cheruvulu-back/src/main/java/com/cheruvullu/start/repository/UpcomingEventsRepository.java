package com.cheruvullu.start.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cheruvullu.start.entity.UpcomingEvents;

@Repository
public interface UpcomingEventsRepository extends JpaRepository<UpcomingEvents, Long> {

    UpcomingEvents findByPondIdAndType(Long pondId,  String type);
}
