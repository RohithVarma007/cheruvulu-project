package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.HarvestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HarvestHistoryRepository extends JpaRepository<HarvestHistory, Long> {
    List<HarvestHistory> findByPondId(Long pondId);
    List<HarvestHistory> findByPondIdAndHarvestType(Long pondId, String harvestType);
}