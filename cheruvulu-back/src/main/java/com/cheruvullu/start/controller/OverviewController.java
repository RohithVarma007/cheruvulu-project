package com.cheruvullu.start.controller;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cheruvullu.start.dto.AddPondRequest;
import com.cheruvullu.start.dto.DailyEventRequest;
import com.cheruvullu.start.dto.OverviewDTO;
import com.cheruvullu.start.entity.DailyEvent;
import com.cheruvullu.start.entity.FishGrowth;
import com.cheruvullu.start.entity.InvestmentHistory;
import com.cheruvullu.start.entity.Pond;
import com.cheruvullu.start.entity.ShrimpFeed;
import com.cheruvullu.start.service.OverViewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/OV")
// @CrossOrigin(origins = "http://localhost:5173")
// @CrossOrigin(origins = "https://cheruvulu-project.vercel.app")
@RequiredArgsConstructor
public class OverviewController {

    private static final Logger log = Logger.getLogger(OverviewController.class.getName());

    private final OverViewService overViewService;

    // THis Api For Daily Event Add
    @PostMapping("/dailyEventInput")
    public ResponseEntity<DailyEvent> createDailyEvent(@Valid @RequestBody DailyEventRequest req) {
        log.info("Daily Event Input Started");
        DailyEvent event = overViewService.save(req);
        return ResponseEntity.ok(event);
    }

    // The OverView Api
    @GetMapping("/overview")
    public OverviewDTO getOverview() {
        return overViewService.getOverview();
    }

    @GetMapping("/pond/{id}")
    public Pond getPondById(@PathVariable Long id) {
        return overViewService.getPondById(id);
    }

    @GetMapping("/fishgrowth/{id}")
    public List<FishGrowth> getFishGrowthById(@PathVariable Long id) {
        return overViewService.getFishGrowthById(id);
    }

    @GetMapping("/shrimpfeed/{id}")
    public List<ShrimpFeed> getShrimpFeedById(@PathVariable Long id) {
        return overViewService.getShrimpFeedById(id);
    }

    @GetMapping("/expensesHistroy/{id}")
    public List<InvestmentHistory> getExpensesHistroy(@PathVariable Long id) {
        return overViewService.getExpensesHistroy(id);
    }

    @PostMapping("/saveInvestment")
    public ResponseEntity<?> saveInvestment(@RequestBody InvestmentHistory entity) {
        overViewService.saveInvestment(entity);
        return ResponseEntity.ok(
                Map.of("message", "Investment saved successfully"));
    }

    @PostMapping("/fishgrowth")
    public ResponseEntity<?> fishgrowth(@RequestBody FishGrowth entity) {
        overViewService.fishgrowth(entity);
        return ResponseEntity.ok(
                Map.of("message", "FishGrowth saved successfully"));
    }

    @PostMapping("/pond/add")
    public ResponseEntity<?> addPond(
            @RequestBody AddPondRequest req) {

        return ResponseEntity.ok(
                overViewService.addPond(req));
    }

}