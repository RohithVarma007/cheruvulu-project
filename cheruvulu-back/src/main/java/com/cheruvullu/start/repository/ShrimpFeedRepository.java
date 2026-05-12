package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.ShrimpFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShrimpFeedRepository extends JpaRepository<ShrimpFeed, Long> {
    List<ShrimpFeed> findByPondId(Long pondId);

    // @Query("SELECT SUM(s.totalCost) FROM ShrimpFeed s WHERE s.pond.id = :pondId")
    // Double sumInvestmentByPond(Long pondId);

    @Query("Select s.shrimpCount from ShrimpFeed s where s.pond.id = :pondId ")
    Integer getShrimpCount(Long pondId);
}