package com.cheruvullu.start.service;

import com.cheruvullu.start.dto.AddPondRequest;
import com.cheruvullu.start.dto.DailyEventRequest;
import com.cheruvullu.start.dto.OverviewDTO;
import com.cheruvullu.start.dto.PondOverviewDTO;
import com.cheruvullu.start.entity.DailyEvent;
import com.cheruvullu.start.entity.FishGrowth;
import com.cheruvullu.start.entity.InvestmentHistory;
import com.cheruvullu.start.entity.Pond;
import com.cheruvullu.start.entity.ShrimpFeed;
import com.cheruvullu.start.entity.UpcomingEvents;
import com.cheruvullu.start.repository.DailyEventRepository;
import com.cheruvullu.start.repository.FishGrowthRepository;
import com.cheruvullu.start.repository.InvestmentHistoryRepository;
import com.cheruvullu.start.repository.PondRepository;
import com.cheruvullu.start.repository.ShrimpFeedRepository;
import com.cheruvullu.start.repository.UpcomingEventsRepository;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OverViewService {

    private final DailyEventRepository dailyEventRepository;
    private final PondRepository pondRepository;
    private final FishGrowthRepository fishGrowthRepository;
    private final ShrimpFeedRepository sfeedRepository;
    private final InvestmentHistoryRepository investmentHistoryRepository;
    private final UpcomingEventsRepository upcomingEventsRepository;

    public DailyEvent save(DailyEventRequest req) {

        validateRequest(req);

        Pond pond = pondRepository.findById(req.getPondId())
                .orElseThrow(() -> new RuntimeException("Pond not found"));

        String note = buildEventNote(req);

        DailyEvent event = new DailyEvent();
        event.setPond(pond);
        event.setDate(req.getDate());

        // 🔥 convert enum list to comma separated string
        event.setEventType(
                String.join(",", req.getEventTypes()));

        event.setLabourCount(req.getLabourCount());
        event.setEventNote(note);

        // =====================================================
        // 🔥 DAILY DOB REDUCTION
        // =====================================================

        if (req.getBagsPerDay() != null && req.getBagsPerDay() > 0) {

            Integer currentDob = pond.getDobBags() == null ? 0 : pond.getDobBags();

            // 🔥 validation
            if (req.getBagsPerDay() > currentDob) {
                throw new RuntimeException(
                        "DOB are less than the feed bags you entered");
            }

            Integer bags = currentDob - req.getBagsPerDay();

            pond.setDobBags(bags);

            // 🔥 fetch existing DOB_LOW event
            UpcomingEvents upEvent = upcomingEventsRepository.findByPondIdAndType(
                    pond.getId(),
                    "DOB_LOW");

            // 🔥 create/update event
            if (bags < 500) {

                if (upEvent == null) {
                    upEvent = new UpcomingEvents();
                    upEvent.setPond(pond);
                    upEvent.setType("DOB_LOW");
                }

                upEvent.setNote(
                        pond.getName() + " DOB are only " + bags);

                upcomingEventsRepository.save(upEvent);

            } else {

                // 🔥 remove old event if stock normal
                if (upEvent != null) {
                    upcomingEventsRepository.delete(upEvent);
                }
            }
        }

        // =====================================================
        // 🔥 FISH GROWTH
        // =====================================================

        if (req.getEventTypes().contains("TRIAL")) {

            FishGrowth fishGrowth = new FishGrowth();
            fishGrowth.setRohuGrams(req.getRohu());
            fishGrowth.setKatlaGrams(req.getKatla());
            fishGrowth.setDate(req.getDate());
            fishGrowth.setPond(pond);

            fishGrowthRepository.save(fishGrowth);
        }

        // =====================================================
        // 🔥 SHRIMP FEED
        // =====================================================

        ShrimpFeed sFeed = new ShrimpFeed();
        sFeed.setFeed7am(req.getFeed7am());
        sFeed.setFeed10am(req.getFeed10am());
        sFeed.setFeed1pm(req.getFeed1pm());
        sFeed.setFeed4pm(req.getFeed4pm());
        sFeed.setDate(req.getDate());
        sFeed.setPond(pond);

        // =====================================================
        // 🔥 MANUAL DOB ADDITION
        // =====================================================

        if (req.getDobBags() != null) {

            pond.setDobBags(
                    (pond.getDobBags() == null ? 0 : pond.getDobBags())
                            + req.getDobBags());

            Integer updatedDob = pond.getDobBags();

            UpcomingEvents upEvent = upcomingEventsRepository.findByPondIdAndType(
                    pond.getId(),
                    "DOB_LOW");

            if (updatedDob < 500) {

                if (upEvent == null) {
                    upEvent = new UpcomingEvents();
                    upEvent.setPond(pond);
                    upEvent.setType("DOB_LOW");
                }

                upEvent.setNote(
                        pond.getName() + " DOB are only " + updatedDob);

                upcomingEventsRepository.save(upEvent);

            } else {

                if (upEvent != null) {
                    upcomingEventsRepository.delete(upEvent);
                }
            }
        }

        // =====================================================
        // 🔥 DEAD FISH
        // =====================================================

        if (req.getRohuDead() != null) {
            pond.setRohuDead(
                    (pond.getRohuDead() == null ? 0 : pond.getRohuDead())
                            + req.getRohuDead());
        }

        if (req.getKatlaDead() != null) {
            pond.setKatlaDead(
                    (pond.getKatlaDead() == null ? 0 : pond.getKatlaDead())
                            + req.getKatlaDead());
        }

        // =====================================================
        // 🔥 SHRIMP COUNT
        // =====================================================

        if (req.getEventTypes().contains("COUNT")) {
            sFeed.setShrimpCount(req.getDayCount());
        }

        boolean hasFeed = req.getFeed7am() != null ||
                req.getFeed10am() != null ||
                req.getFeed1pm() != null ||
                req.getFeed4pm() != null;

        if (hasFeed || req.getEventTypes().contains("COUNT")) {
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

        if (req.getEventTypes().contains("TRIAL")) {
            if (req.getRohu() == null || req.getRohu() <= 0
                    || req.getKatla() == null || req.getKatla() <= 0) {
                throw new RuntimeException("Rohu and Katla are required for trial");
            }
        }

        else if (req.getEventTypes().contains("COUNT"))

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

        if (req.getEventTypes().contains("TRIAL")) {

            return "Trial Net → Rohu: " + req.getRohu()
                    + " gms, Katla: " + req.getKatla() + " gms";

        } else if (req.getEventTypes().contains("COUNT")) {

            return "Count Day → Day: " + req.getDayCount();

        } else {

            return req.getEventNote();
        }
    }

    public OverviewDTO getOverview() {

        List<Pond> ponds = pondRepository.findByStartDateIsNotNull();
        List<PondOverviewDTO> result = new ArrayList<>();
        List<UpcomingEvents> events = upcomingEventsRepository.findAll();

        double grandTotal = 0;

        for (Pond pond : ponds) {

            List<FishGrowth> growthList = fishGrowthRepository.findTop2ByPondIdOrderByIdDesc(pond.getId());

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
            dto.setStartDate(pond.getStartDate());

            // 🔥 grand total
            grandTotal += investment;

            dto.setLatestCount(shrimpCount != null ? shrimpCount : 0);

            dto.setTotalFeedShrimp(
                    pond.getTotalFeedShrimp() != null
                            ? pond.getTotalFeedShrimp()
                            : 0);

            result.add(dto);
        }

        return new OverviewDTO(grandTotal, result, events);
    }

    public Pond getPondById(Long id) {
        return pondRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pond not found"));
    }

    public List<FishGrowth> getFishGrowthById(Long id) {
        return fishGrowthRepository.findByPondIdOrderByIdDesc(id);
    }

    public List<ShrimpFeed> getShrimpFeedById(Long id) {
        return sfeedRepository.findByPondId(id);
    }

    public List<InvestmentHistory> getExpensesHistroy(Long id) {
        return investmentHistoryRepository.findByPondId(id);
    }

    @Transactional
    public Map<String, Object> saveInvestment(InvestmentHistory entity) {
        InvestmentHistory saved = investmentHistoryRepository.save(entity);

        Pond pond = pondRepository.findById(entity.getPond().getId())
                .orElseThrow(() -> new RuntimeException("Pond not found"));
        pond.setTotalInvestment(
                (pond.getTotalInvestment() == null ? 0.0 : pond.getTotalInvestment()) + entity.getAmount());
        pondRepository.save(pond);

        return Map.of(
                "message", "Investment saved successfully",
                "data", saved);
    }

    public void fishgrowth(FishGrowth entity) {
        fishGrowthRepository.save(entity);

        DailyEvent event = new DailyEvent();
        event.setPond(entity.getPond());
        event.setDate(entity.getDate());
        event.setEventType("TRIAL");
        event.setEventNote("Added from Pond Trail Net Option");
        dailyEventRepository.save(event);

    }

    public Pond addPond(AddPondRequest req) {

        Pond pond = pondRepository.findById(req.getPondId())
                .orElseThrow(() -> new RuntimeException("Pond not found"));

        pond.setCropType(req.getCropType());
        pond.setStartDate(req.getStartDate());

        // fish stock
        pond.setRohuStock(req.getRohuStock() == null ? 0 : req.getRohuStock());
        pond.setKatlaStock(req.getKatlaStock() == null ? 0 : req.getKatlaStock());

        // dob
        Integer updatedDob = req.getDobBags();
        UpcomingEvents upEvent = upcomingEventsRepository.findByPondIdAndType(
                pond.getId(),
                "DOB_LOW");

        if (updatedDob < 500) {

            if (upEvent == null) {
                upEvent = new UpcomingEvents();
                upEvent.setPond(pond);
                upEvent.setType("DOB_LOW");
            }

            upEvent.setNote(
                    pond.getName() + " DOB are only " + updatedDob);

            upcomingEventsRepository.save(upEvent);

        } else {

            if (upEvent != null) {
                upcomingEventsRepository.delete(upEvent);
            }
        }
        pond.setDobBags(req.getDobBags() == null ? 0 : req.getDobBags());
        pond.setRohuDead(0);
        pond.setKatlaDead(0);
        pond.setLeftStock(0);
        pond.setTotalFeedShrimp(0);

        Pond savedPond = pondRepository.save(pond);

        // 🔥 save initial fish growth
        if ("Fish".equalsIgnoreCase(req.getCropType())) {

            FishGrowth growth = new FishGrowth();

            growth.setPond(savedPond);
            growth.setDate(req.getStartDate());

            growth.setRohuGrams(req.getRohuGrams() == null ? 0 : req.getRohuGrams());
            growth.setKatlaGrams(req.getKatlaGrams() == null ? 0 : req.getKatlaGrams());

            fishGrowthRepository.save(growth);
        }

        return savedPond;
    }

}