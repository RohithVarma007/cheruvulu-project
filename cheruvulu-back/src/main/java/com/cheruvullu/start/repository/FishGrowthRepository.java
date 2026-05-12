package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.FishGrowth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishGrowthRepository extends JpaRepository<FishGrowth, Long> {
    List<FishGrowth> findByPondId(Long pondId);

    List<FishGrowth> findTop2ByPondIdOrderByDateDesc(Long pondId);

}