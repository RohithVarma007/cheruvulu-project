package com.cheruvullu.start.service;

import com.cheruvullu.start.constants.EventType;
import com.cheruvullu.start.dto.DailyEventRequest;
import com.cheruvullu.start.dto.OverviewDTO;
import com.cheruvullu.start.dto.PondOverviewDTO;
import com.cheruvullu.start.entity.DailyEvent;
import com.cheruvullu.start.entity.FishGrowth;
import com.cheruvullu.start.entity.InvestmentHistory;
import com.cheruvullu.start.entity.Pond;
import com.cheruvullu.start.entity.ShrimpFeed;
import com.cheruvullu.start.repository.DailyEventRepository;
import com.cheruvullu.start.repository.FishGrowthRepository;
import com.cheruvullu.start.repository.InvestmentHistoryRepository;
import com.cheruvullu.start.repository.PondRepository;
import com.cheruvullu.start.repository.ShrimpFeedRepository;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OverViewService {

    private final DailyEventRepository dailyEventRepository;
    private final PondRepository pondRepository;
    private final FishGrowthRepository fishGrowthRepository;
    private final ShrimpFeedRepository sfeedRepository;
    private final InvestmentHistoryRepository investmentHistoryRepository;

    public DailyEvent save(DailyEventRequest req) {

        validateRequest(req);

        Pond pond = pondRepository.findById(req.getPondId())
                .orElseThrow(() -> new RuntimeException("Pond not found"));

        EventType type = req.getEventType();

        String note = buildEventNote(req);

        DailyEvent event = new DailyEvent();
        event.setPond(pond);
        event.setDate(req.getDate());
        event.setEventType(type);
        event.setLabourCount(req.getLabourCount());
        event.setEventNote(note);

        // -------- Fish Growth --------
        if (type == EventType.TRIAL) {
            FishGrowth fishGrowth = new FishGrowth();
            fishGrowth.setRohuGrams(req.getRohu());
            fishGrowth.setKatlaGrams(req.getKatla());
            fishGrowth.setDate(req.getDate());
            fishGrowth.setPond(pond);
            fishGrowthRepository.save(fishGrowth);
        }

        // -------- Shrimp Feed --------
        ShrimpFeed sFeed = new ShrimpFeed();
        sFeed.setFeed7am(req.getFeed7am());
        sFeed.setFeed10am(req.getFeed10am());
        sFeed.setFeed1pm(req.getFeed1pm());
        sFeed.setFeed4pm(req.getFeed4pm());
        sFeed.setDate(req.getDate());
        sFeed.setPond(pond);

        // -------- DOB & Dead FIsh ------
        if (req.getDobBags() != null) {
            pond.setDobBags(pond.getDobBags() + req.getDobBags());
        }
        if (req.getRohuDead() != null) {
            pond.setRohuDead(pond.getRohuDead() + req.getRohuDead());
        }
        if (req.getKatlaDead() != null) {
            pond.setKatlaDead(pond.getKatlaDead() + req.getKatlaDead());
        }

        if (type == EventType.COUNT) {
            sFeed.setShrimpCount(req.getDayCount());
        }

        boolean hasFeed = req.getFeed7am() != null || req.getFeed10am() != null
                || req.getFeed1pm() != null || req.getFeed4pm() != null;

        if (hasFeed || type == EventType.COUNT) {
            sfeedRepository.save(sFeed);
        }

        pondRepository.save(pond);

        return dailyEventRepository.save(event);
    }

    private void validateRequest(DailyEventRequest req) {

        if (req.getPondId() == null) {
            throw new RuntimeException("Pond ID is required");
        }

        if (req.getDate() == null) {
            throw new RuntimeException("Date is required");
        }

        if (req.getEventType() == EventType.TRIAL) {
            if (req.getRohu() == null || req.getRohu() <= 0
                    || req.getKatla() == null || req.getKatla() <= 0) {
                throw new RuntimeException("Rohu and Katla are required for trial");
            }
        }

        else if (req.getEventType() == EventType.COUNT)

        {
            if (req.getDayCount() == null) {
                throw new RuntimeException("DayCount is required for count");
            }
        }

        // else {
        // if (req.getEventNote() == null || req.getEventNote().isBlank()) {
        // throw new RuntimeException("Event note is required");
        // }
        // }

        if (req.getLabourCount() != null && req.getLabourCount() < 0) {
            throw new RuntimeException("Labour count cannot be negative");
        }
    }

    private String buildEventNote(DailyEventRequest req) {

        if (req.getEventType() == EventType.TRIAL) {
            return "Trial Net → Rohu: " + req.getRohu() + " gms, Katla: " + req.getKatla() + " gms";

        } else if (req.getEventType() == EventType.COUNT) {
            return "Count Day → Day: " + req.getDayCount();

        } else {
            return req.getEventNote();
        }
    }

    public OverviewDTO getOverview() {

        List<Pond> ponds = pondRepository.findByStartDateIsNotNull();
        List<PondOverviewDTO> result = new ArrayList<>();

        double grandTotal = 0;

        for (Pond pond : ponds) {

            List<FishGrowth> growthList = fishGrowthRepository.findTop2ByPondIdOrderByDateDesc(pond.getId());

            Integer shrimpCount = sfeedRepository.getShrimpCount(pond.getId());

            FishGrowth latest = growthList.size() >= 1 ? growthList.get(0) : null;
            FishGrowth previous = growthList.size() >= 2 ? growthList.get(1) : null;

            PondOverviewDTO dto = new PondOverviewDTO();

            dto.setPondId(pond.getId());
            dto.setPondName(pond.getName());

            // ✅ Present
            dto.setPresentRohu(latest != null ? latest.getRohuGrams() : 0.0);
            dto.setPresentKatla(latest != null ? latest.getKatlaGrams() : 0.0);

            // ✅ Previous
            dto.setPreviousRohu(previous != null ? previous.getRohuGrams() : 0.0);
            dto.setPreviousKatla(previous != null ? previous.getKatlaGrams() : 0.0);

            // ✅ Investment
            double investment = pond.getTotalInvestment() != null
                    ? pond.getTotalInvestment()
                    : 0;

            dto.setTotalInvestment(investment);
            dto.setCropType(pond.getCropType());

            // 🔥 grand total
            grandTotal += investment;

            dto.setLatestCount(shrimpCount != null ? shrimpCount : 0);

            dto.setTotalFeedShrimp(
                    pond.getTotalFeedShrimp() != null
                            ? pond.getTotalFeedShrimp()
                            : 0);

            result.add(dto);
        }

        return new OverviewDTO(grandTotal, result);
    }

    public Pond getPondById(Long id) {
        return pondRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pond not found"));
    }

    public List<FishGrowth> getFishGrowthById(Long id) {
        return fishGrowthRepository.findByPondId(id);
    }

    public List<ShrimpFeed> getShrimpFeedById(Long id) {
        return sfeedRepository.findByPondId(id);
    }

    public List<InvestmentHistory> getExpensesHistroy(Long id) {
        return investmentHistoryRepository.findByPondId(id);
    }

    public Map<String, Object> saveInvestment(InvestmentHistory entity) {
        InvestmentHistory saved = investmentHistoryRepository.save(entity);

        return Map.of(
                "message", "Investment saved successfully",
                "data", saved);
    }

}