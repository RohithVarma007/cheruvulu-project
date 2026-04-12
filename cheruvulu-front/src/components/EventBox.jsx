import { useState } from "react";
import { PONDS } from "../constants/ponds";

function EventBox({ text }) {
  const [showModal, setShowModal] = useState(false);
  const [pond, setPond] = useState("");

  const [newEntry, setNewEntry] = useState({
    date: "",
    feed: "",
    labourToday: "",
    bagSize: "",
    event: "",
  });

  // 🔥 Auto format date
  const handleDateChange = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
    } else if (cleaned.length > 4) {
      cleaned =
        cleaned.slice(0, 2) +
        "-" +
        cleaned.slice(2, 4) +
        "-" +
        cleaned.slice(4, 6);
    }

    setNewEntry({ ...newEntry, date: cleaned });
  };

  // 🔥 Save handler
  const handleSave = () => {
    const isValidDate = /^\d{2}-\d{2}-\d{2}$/.test(newEntry.date);

    if (!isValidDate) {
      alert("Date must be in DD-MM-YY format");
      return;
    }

    if (!pond) {
      alert("Please select a pond");
      return;
    }

    console.log("Saved Data:", {
      pond,
      ...newEntry,
    });

    // reset
    setNewEntry({
      date: "",
      feed: "",
      bagSize: "",
      event: "",
      labourToday: "",
    });
    setPond("");
    setShowModal(false);
  };

  return (
    <>
      {/* 🔥 Event Box */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.event1}>📢 Latest Event</h3>

          <button style={styles.button} onClick={() => setShowModal(true)}>
            Daily Update
          </button>
        </div>

        <div style={styles.marquee}>
          <p style={styles.text}>{text}</p>
        </div>
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
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
              <select
                style={styles.input}
                value={pond}
                onChange={(e) => setPond(e.target.value)}
              >
                <option value="">Select Pond</option>
                {PONDS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="DD-MM-YY"
                style={styles.input}
                value={newEntry.date}
                onChange={(e) => handleDateChange(e.target.value)}
              />

              <input
                placeholder="Feed in bags"
                style={styles.input}
                value={newEntry.feed}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, feed: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Bag size"
                style={styles.input}
                value={newEntry.bagSize}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, bagSize: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="No of labour Today"
                style={styles.input}
                value={newEntry.labourToday}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    labourToday: (e.target.value),
                  })
                }
              />

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
                onClick={() => setShowModal(false)}
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
    </>
  );
}

const styles = {
  container: {
    marginTop: "-6px",
    padding: "15px",
    backgroundColor: "#2d9dc8",
    border: "1px solid #ddd",
    borderRadius: "8px",
    color: "#fff",
    overflow: "hidden",
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

  marquee: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    marginTop: "8px",
  },

  text: {
    display: "inline-block",
    paddingLeft: "100%",
    animation: "scrollText 25s linear infinite",
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
};

export default EventBox;