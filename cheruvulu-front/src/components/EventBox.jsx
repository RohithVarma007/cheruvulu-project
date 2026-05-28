import { useState, useEffect } from "react";
import { PONDS } from "../constants/ponds";
import { api } from "../api/api";
import Select from "react-select";

function EventBox({ overview }) {
  const [showModal, setShowModal] = useState(false);
  const [pond, setPond] = useState("");
  const [pondType, setPondType] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const upcomingEvents = overview?.events || [];

  const [newEntry, setNewEntry] = useState({
    date: "",
    feed: "",
    labourToday: "",
    bagSize: "",
    event: "",
  });

  const resetForm = () => {
    setPond("");
    setPondType("");
    setEventTypes([]);

    setNewEntry({
      date: "",
      feed: "",
      bagSize: "",
      labourToday: "",
      event: "",
      feed7am: "",
      feed10am: "",
      feed1pm: "",
      feed4pm: "",
      rohu: "",
      katla: "",
      dayCount: "",
      removedBags: "",
      feedSize: "",
    });
  };


  const [events, setEvents] = useState([]);

  const parseDate = (str) => {
    const [dd, mm, yy] = str.split("-");
    return new Date(`20${yy}`, mm - 1, dd);
  };

  const latestEvents = events
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 4);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();


  const handleEventToggle = (type) => {
    setEventTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const eventOptions =
    pondType === "Fish"
      ? [
        { value: "trial", label: "Trial Net" },
        { value: "deadFish", label: "Dead Fish" },
        { value: "dob", label: "DOB" },
      ]
      : [
        { value: "count", label: "Count Day" },

      ];

  const [showAddPondModal, setShowAddPondModal] = useState(false);

  const [newPond, setNewPond] = useState({
    pondName: "",
    cropType: "",
    startDate: "",
    rohuStock: "",
    katlaStock: "",
    dobBags: "",
    rohuGrams: "",
    katlaGrams: "",
  });

  const availablePonds = PONDS.filter(
    p =>
      !overview?.ponds?.some(
        op => op.pondName === p.name
      )
  );



  const handleSave = async () => {
    if (!newEntry.date) {
      alert("Please select a valid date");
      return;
    }

    if (!pond) {
      alert("Please select a pond");
      return;
    }

    // if (eventTypes.length === 0) {
    //   alert("Please select at least one event");
    //   return;
    // }

    // 🔥 Event-specific validation
    if (eventTypes.includes("dob") && !newEntry.dobBags) {
      alert("Enter DOB bags");
      return;
    }

    if (eventTypes.includes("deadFish") && (!newEntry.rohuDead && !newEntry.katlaDead)) {
      alert("Enter dead fish count");
      return;
    }

    if (eventTypes.includes("trial") && (!newEntry.rohu && !newEntry.katla)) {
      alert("Enter trial values");
      return;
    }

    if (eventTypes.includes("count") && !newEntry.dayCount) {
      alert("Enter day count");
      return;
    }

    try {
      const selectedPond = overview?.ponds?.find(
        p => p.pondName === pond
      );

      const payload = {
        pondId: selectedPond?.pondId,
        date: newEntry.date,
        eventTypes: eventTypes.map(e => e.toUpperCase()),
        bagsPerDay: newEntry.bagsPerDay,


        labourCount: newEntry.labourToday
          ? Number(newEntry.labourToday)
          : null,

        // shrimp feed
        feed7am: newEntry.feed7am ? Number(newEntry.feed7am) : null,
        feed10am: newEntry.feed10am ? Number(newEntry.feed10am) : null,
        feed1pm: newEntry.feed1pm ? Number(newEntry.feed1pm) : null,
        feed4pm: newEntry.feed4pm ? Number(newEntry.feed4pm) : null,

        // fish trial
        rohu: newEntry.rohu ? Number(newEntry.rohu) : null,
        katla: newEntry.katla ? Number(newEntry.katla) : null,

        // shrimp count
        dayCount: newEntry.dayCount ? Number(newEntry.dayCount) : null,

        // 🔥 NEW FIELDS
        dobBags: newEntry.dobBags ? Number(newEntry.dobBags) : null,
        rohuDead: newEntry.rohuDead ? Number(newEntry.rohuDead) : null,
        katlaDead: newEntry.katlaDead ? Number(newEntry.katlaDead) : null,

        // manual note
        eventNote: newEntry.event,
      };

      console.log("🔥 Sending Payload:", payload);

      const data = await api("OV/dailyEventInput", "POST", payload);
      console.log("✅ Saved:", data);

      const entry = {
        id: Date.now(),
        pond,
        pondType,
        eventTypes,
        ...newEntry,
      };

      setEvents((prev) => [entry, ...prev]);

      resetForm();
      setShowModal(false);

    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  return (
    <>
      {/* 🔥 Event Box */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.event1}>📢 Latest Event</h3>

          <div style={styles.headerButtons}>
            <button
              style={styles.button}
              onClick={() => setShowModal(true)}
            >
              Daily Update
            </button>

            <button
              style={styles.moreButton}
              onClick={() => setShowAddPondModal(true)}
            >
              ⋮
            </button>
          </div>
        </div>
        {/* 🔥 Event Content */}
        <div style={styles.eventWrapper}>

          {/* Latest Events
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Latest Updates</h4>

            <ul style={styles.list}>
              {latestEvents.length === 0 ? (
                <li>No data</li>
              ) : (
                latestEvents.map((e, i) => (
                  <li key={e.id}>
                    {i + 1}. {e.event || "Update"} - {e.pond}
                    {e.feed && ` (${e.feed} bags)`}
                  </li>
                ))
              )}
            </ul>
          </div> */}

          {/* Upcoming Events */}
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Upcoming Events</h4>

            {upcomingEvents.length === 0 ? (
              <div>No upcoming events</div>
            ) : (
              <ul style={styles.eventList}>
                {upcomingEvents.map((e, index) => {

                  // 🔥 split text and numbers
                  const parts = e.note.split(/(\d+)/g);

                  return (
                    <li key={e.id} style={styles.eventItem}>

                      {parts.map((part, i) => {

                        const isNumber = /^\d+$/.test(part);

                        return (
                          <span
                            key={i}
                            style={{
                              color: isNumber ? "#dc2626" : "#111",
                              fontWeight: isNumber ? "700" : "400",
                            }}
                          >
                            {part}
                          </span>
                        );
                      })}

                    </li>
                  );
                })}
              </ul>
            )}
          </div>

        </div>
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={() => { resetForm(); setShowModal(false) }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div style={styles.modalHeader}>
              <h2>Daily Update</h2>
              <button
                style={styles.closeIcon}
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
            </div>

            {/* Form */}
            <div style={styles.form}>

              {/* 🔥 SELECT POND */}
              <select
                style={styles.input}
                value={pond}
                onChange={(e) => {
                  const selected = overview?.ponds?.find(
                    p => p.pondName === e.target.value
                  );
                  setPond(e.target.value);
                  setPondType(selected?.cropType);
                  setEventTypes([]); // reset event
                }}
              >
                <option value="">Select Pond</option>
                {overview?.ponds?.map((p) => (
                  <option key={p.pondId} value={p.pondName}>
                    {p.pondName}
                  </option>
                ))}
              </select>

              {/* 🔥 DATE */}
              <input
                type="date"
                style={styles.input}
                value={newEntry.date}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, date: e.target.value })
                }
              />

              {pondType === "Fish" && (
                <>
                  <input
                    placeholder="Feed in bags"
                    style={styles.input}
                    value={newEntry.bagsPerDay}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, bagsPerDay: e.target.value })
                    }
                  />

                  {/* <input
                    type="number"
                    placeholder="Bag size"
                    style={styles.input}
                    value={newEntry.bagSize}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, bagSize: e.target.value })
                    }
                  /> */}
                </>
              )}

              {pondType === "Shrimp" && (
                <div style={styles.feedRow}>
                  <input
                    placeholder="7 AM"
                    style={styles.feedInput}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, feed7am: e.target.value })
                    }
                  />

                  <input
                    placeholder="10 AM"
                    style={styles.feedInput}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, feed10am: e.target.value })
                    }
                  />

                  <input
                    placeholder="1 PM"
                    style={styles.feedInput}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, feed1pm: e.target.value })
                    }
                  />

                  <input
                    placeholder="4 PM"
                    style={styles.feedInput}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, feed4pm: e.target.value })
                    }
                  />
                </div>
              )}

              {/* 🔥 COMMON */}
              <input
                type="number"
                placeholder="No of labour Today"
                style={styles.input}
                value={newEntry.labourToday}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, labourToday: e.target.value })
                }
              />

              <Select
                isMulti
                placeholder="Event Type"
                options={eventOptions}
                value={eventOptions.filter(o => eventTypes.includes(o.value))}
                onChange={(selected) =>
                  setEventTypes(selected ? selected.map(s => s.value) : [])
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#3f3f3f",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    minHeight: "38px",   // ↓ reduced height
                    height: "38px",
                    boxShadow: "none",
                  }),

                  valueContainer: (base) => ({
                    ...base,
                    padding: "0 10px",   // align like input
                    display: "flex",
                    alignItems: "center",
                  }),

                  input: (base) => ({
                    ...base,
                    margin: "0px",
                    padding: "0px",
                    color: "#fff",
                  }),

                  placeholder: (base) => ({
                    ...base,
                    color: "#ccc",
                    margin: 0,
                    padding: 0,
                    maxWidth: "80%",     // limits width
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }),

                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    margin: "2px",
                  }),

                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#fff",
                  }),

                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "38px",
                  }),

                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />

              {/* 🔥 EVENT BASED INPUTS */}

              {/* Fish → Trial Net */}
              {eventTypes.includes("trial") && (
                <>
                  {/* <h4>Trial Net</h4> */}
                  <input
                    placeholder="Rohu (R)"
                    style={styles.input}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, rohu: e.target.value })
                    }
                  />
                  <input
                    placeholder="Katla (K)"
                    style={styles.input}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, katla: e.target.value })
                    }
                  />
                </>
              )}

              {eventTypes.includes("dob") && (
                <div>
                  {/* <h4>DOB</h4> */}
                  <input
                    placeholder="No of DOB Bags"
                    style={{ ...styles.input, width: "94%" }}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, dobBags: e.target.value })
                    }
                  />
                </div>
              )}
              {eventTypes.includes("deadFish") && (
                <div>
                  {/* <h4>Dead Fish</h4> */}
                  <input
                    placeholder="Rohu Dead No"
                    style={{ ...styles.input, width: "94%" }}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, rohuDead: e.target.value })
                    }
                  />
                  <input
                    placeholder="Katla Dead No"
                    style={{ ...styles.input, width: "94%" }}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, katlaDead: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Shrimp → Count Day */}
              {eventTypes.includes("count") && (
                <>
                  {/* <h4>Count Day</h4> */}
                  <input
                    placeholder="Day Count"
                    style={styles.input}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, dayCount: e.target.value })
                    }
                  />
                </>
              )}

              <input
                placeholder="Event"
                style={styles.input}
                value={newEntry.event}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, event: e.target.value })
                }
              />

            </div>

            {/* Actions */}
            <div style={styles.actions}>
              <button
                style={styles.cancel}
                onClick={() => { resetForm(); setShowModal(false) }}
              >
                Cancel
              </button>

              <button style={styles.save} onClick={handleSave}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🔥 ADD POND MODAL */}
      {showAddPondModal && (
        <div
          style={styles.overlay}
          onClick={() => setShowAddPondModal(false)}
        >
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >

            <div style={styles.modalHeader}>
              <h2>Add Pond</h2>

              <button
                style={styles.closeIcon}
                onClick={() => setShowAddPondModal(false)}
              >
                ✖
              </button>
            </div>

            <div style={styles.form}>

              {/* Pond Dropdown */}
              <select
                style={styles.input}
                value={newPond.pondName}
                onChange={(e) =>
                  setNewPond({
                    ...newPond,
                    pondName: e.target.value,
                  })
                }
              >
                <option value="">Select Pond</option>

                {availablePonds.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Crop Type */}
              <select
                style={styles.input}
                value={newPond.cropType}
                onChange={(e) =>
                  setNewPond({
                    ...newPond,
                    cropType: e.target.value,
                  })
                }
              >
                <option value="">Select Crop Type</option>
                <option value="Fish">Fish</option>
                <option value="Shrimp">Shrimp</option>
              </select>

              {/* Start Date */}
              <input
                type="date"
                style={styles.input}
                value={newPond.startDate}
                onChange={(e) =>
                  setNewPond({
                    ...newPond,
                    startDate: e.target.value,
                  })
                }
              />

              {/* Fish Fields */}
              {newPond.cropType === "Fish" && (
                <>
                  <input
                    type="number"
                    placeholder="Rohu Stock"
                    style={styles.input}
                    value={newPond.rohuStock}
                    onChange={(e) =>
                      setNewPond({
                        ...newPond,
                        rohuStock: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Katla Stock"
                    style={styles.input}
                    value={newPond.katlaStock}
                    onChange={(e) =>
                      setNewPond({
                        ...newPond,
                        katlaStock: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="DOB Bags (Optional)"
                    style={styles.input}
                    value={newPond.dobBags}
                    onChange={(e) =>
                      setNewPond({
                        ...newPond,
                        dobBags: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Rohu Size (grams)"
                    style={styles.input}
                    value={newPond.rohuGrams}
                    onChange={(e) =>
                      setNewPond({
                        ...newPond,
                        rohuGrams: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Katla Size (grams)"
                    style={styles.input}
                    value={newPond.katlaGrams}
                    onChange={(e) =>
                      setNewPond({
                        ...newPond,
                        katlaGrams: e.target.value,
                      })
                    }
                  />
                </>
              )}

              {/* Shrimp */}
              {newPond.cropType === "Shrimp" && (
                <input
                  type="number"
                  placeholder="DOB Bags"
                  style={styles.input}
                  value={newPond.dobBags}
                  onChange={(e) =>
                    setNewPond({
                      ...newPond,
                      dobBags: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <div style={styles.actions}>
              <button
                style={styles.cancel}
                onClick={() => setShowAddPondModal(false)}
              >
                Cancel
              </button>

              <button
                style={styles.save}
                onClick={async () => {

                  try {

                    // 🔥 COMMON VALIDATION
                    if (!newPond.pondName) {
                      alert("Please select pond");
                      return;
                    }

                    if (!newPond.cropType) {
                      alert("Please select crop type");
                      return;
                    }

                    if (!newPond.startDate) {
                      alert("Please select start date");
                      return;
                    }

                    // 🔥 FISH VALIDATION
                    if (newPond.cropType === "Fish") {

                      if (!newPond.rohuStock) {
                        alert("Enter Rohu stock");
                        return;
                      }

                      if (!newPond.katlaStock) {
                        alert("Enter Katla stock");
                        return;
                      }

                      if (!newPond.rohuGrams) {
                        alert("Enter Rohu grams");
                        return;
                      }

                      if (!newPond.katlaGrams) {
                        alert("Enter Katla grams");
                        return;
                      }
                    }

                    // 🔥 SHRIMP VALIDATION
                    if (newPond.cropType === "Shrimp") {

                      if (!newPond.dobBags) {
                        alert("Enter DOB bags");
                        return;
                      }
                    }

                    const selectedPond = PONDS.find(
                      p => p.name === newPond.pondName
                    );

                    const payload = {
                      pondId: selectedPond?.id,
                      cropType: newPond.cropType,
                      startDate: newPond.startDate,

                      rohuStock: Number(newPond.rohuStock) || 0,
                      katlaStock: Number(newPond.katlaStock) || 0,

                      dobBags: Number(newPond.dobBags) || 0,

                      rohuGrams: Number(newPond.rohuGrams) || 0,
                      katlaGrams: Number(newPond.katlaGrams) || 0,
                    };

                    console.log(payload);

                    await api("OV/pond/add", "POST", payload);

                    setShowAddPondModal(false);

                  } catch (err) {
                    console.error(err);
                    alert("Error adding pond");
                  }
                }}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )} </>
  );
}

const styles = {
  container: {
    marginTop: "-6px",
    padding: "15px",
    backgroundColor: "#588db1",
    border: "1px solid #ddd",
    borderRadius: "8px",
    color: "#fff",
    overflow: "hidden",
  },
  gridList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 🔥 2 per row
    gap: "8px",
    marginTop: "8px",
  },

  gridItem: {
    background: "#f1f5f9",
    padding: "8px",
    borderRadius: "6px",
    fontSize: "12px",
    width: "100%",
    boxSizing: "border-box",
  },

  date: {
    fontWeight: "bold",
    color: "#2563eb",
    fontSize: "12px",
  },

  pond: {
    fontSize: "11px",
    color: "#555",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fff",
    color: "#2d9dc8",
    cursor: "pointer",
    fontWeight: "bold",
  },

  eventWrapper: {
    display: "grid",
    // gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "12px",
  },

  card: {
    background: "#ffffff",
    color: "#111",
    borderRadius: "10px",
    padding: "10px",
  },

  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#527d8d",
  },

  list: {
    margin: 0,
    paddingLeft: "15px",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  event1: {
    margin: 0,
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "400px",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeIcon: {
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  save: {
    backgroundColor: "#111827",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancel: {
    backgroundColor: "#ddd",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#111827",
  },

  feedRow: {
    display: "flex",
    gap: "2px",
    // overflowX: "auto",  
  },

  feedInput: {
    minWidth: "80px",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    textAlign: "center",
  },
  eventList: {
    margin: 0,
    padding: 0,
    listStyle: "disc inside",

    display: "grid",

    // 🔥 desktop = 2 columns
    // 🔥 mobile = 1 column
    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "1fr 1fr",

    gap: "12px",
  },

  eventItem: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#111",

    background: "#f3f4f6",
    borderRadius: "8px",

    padding: "10px 14px",

    border: "1px solid #e5e7eb",

    boxShadow: "inset 0 0 0 1px #f9fafb",

    wordBreak: "break-word",
  },
  headerButtons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  moreButton: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    border: "none",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default EventBox;