package com.cheruvullu.start.dto;

import java.util.List;

import com.cheruvullu.start.entity.InvestmentHistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class pondInvestmentDTO {
    
    private List<InvestmentHistory> InvestmentHistory;
    private Double totalInvestment;  


}
