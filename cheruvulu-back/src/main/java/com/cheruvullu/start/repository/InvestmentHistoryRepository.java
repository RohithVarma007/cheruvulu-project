package com.cheruvullu.start.repository;

import com.cheruvullu.start.entity.InvestmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentHistoryRepository extends JpaRepository<InvestmentHistory, Long> {
    List<InvestmentHistory> findByPondId(Long pondId);
    // @Query("SELECT SUM(s.totalCost) FROM ShrimpFeed s WHERE s.pond.id = :pondId")
    // Double sumInvestmentByPond(Long pondId);

}