import { useState } from "react";

function InfoCards() {
    const [selectedCard, setSelectedCard] = useState(null);     // for card popup
    const [selectedInvestment, setSelectedInvestment] = useState(null); // for amount popup
    const [showAddModal, setShowAddModal] = useState(false);

    const [newEntry, setNewEntry] = useState({
        date: "",
        desc: "",
        amount: "",
    });

    const data = [
        {
            id: 1,
            place: "Mekaladibba 70 A",
            feed: "85 kg/day",
            startDate: "2024-04-01",
            endDate: "2024-04-06",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
            fishHistory: [
                { date: "01 Apr", rohu: "200", katla: "800" },
                { date: "03 Apr", rohu: "400", katla: "1200" },
                { date: "06 Apr", rohu: "800 ", katla: "1600" },
                { date: "06 Apr", rohu: "800 ", katla: "1600" },
                { date: "06 Apr", rohu: "800 ", katla: "1600" },
                { date: "06 Apr", rohu: "800 ", katla: "1600" },
            ]
        },
        {
            id: 2,
            place: "Mekaladibba 80 A",
            feed: "60 kg/day",
            investment: 90000,
            startDate: "2024-04-01",
            endDate: "2024-04-06",
            history: [{ date: "02 Apr", desc: "Seed", amount: 30000 }],
            fishHistory: [
                { date: "01 Apr", rohu: "200", katla: "800" },
                { date: "03 Apr", rohu: "400", katla: "1200" },
                { date: "06 Apr", rohu: "800 ", katla: "1600" },
            ]
        },
        {
            id: 3,
            place: "Gunnapudi 75 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 7710000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 4,
            place: "Kalingapeta 65 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 5,
            place: "Mekaladibba 7 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 6,
            place: "Mekaladibba 13 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 7,
            place: "Mekaladibba 18 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 8,
            place: "Mekaladibba 3 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
            id: 9,
            place: "Mekaladibba 1 A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            investment: 120000,
            history: [
                { date: "01 Apr", desc: "Seed", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
    ];

    const calculateDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();

        const diffTime = endDate - startDate;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const totalInvestment = data.reduce((sum, item) => sum + item.investment, 0);

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const handleAdd = () => {
        if (!newEntry.date || !newEntry.desc || !newEntry.amount) return;

        const updated = {
            ...selected,
            history: [
                ...selected.history,
                { ...newEntry, amount: Number(newEntry.amount) },
            ],
        };

        setSelected(updated);
        setNewEntry({ date: "", desc: "", amount: "" });
        setShowAddModal(false);
    };

    return (
        <>
            {/* 🔥 TOTAL INVESTMENT */}
            <div style={styles.totalCard}>
                <h2>Total Investment</h2>
                <h1>₹{totalInvestment.toLocaleString()}</h1>
            </div>

            {/* 🔥 CARDS */}
            <div style={styles.container}>
                {data.map((item) => (
                    <div key={item.id} style={styles.card} onClick={() => setSelectedCard(item)} >
                        <h3>{item.place}</h3>
                        <p>📏 Rohu: {item.fishHistory?.[0]?.rohu || item.Rohu} gms</p>
                        <p>📏 Katla: {item.fishHistory?.[0]?.katla || item.Katla} gms</p>

                        {/* 🔥 CLICKABLE INVESTMENT */}
                        <p
                            style={styles.investment}
                            onClick={(e) => {
                                e.stopPropagation(); // 🔥 prevent card click
                                setSelectedInvestment(item); // 👈 amount click
                            }}
                        >
                            💰 ₹{item.investment.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* 🔥 POPUP → HISTORY */}
            {selectedCard && (
                <div style={styles.overlay} onClick={() => setSelectedCard(null)}>
                    <div
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selectedCard.place}</h2>

                        {/* 🔥 Date + Days */}
                        <div style={styles.dateRow}>
                            <span>
                                📅 {selectedCard.startDate} →{" "}
                                {selectedCard.endDate || today}
                            </span>

                            <span>
                                ⏱ {calculateDays(
                                    selectedCard.startDate,
                                    selectedCard.endDate || today
                                )} days
                            </span>
                        </div>
                        <div style={styles.stock}>
                            <span>  Stock - Rohu {100000..toLocaleString()}, Katla {800..toLocaleString()}
                            </span>
                        </div>

                        <p>📏 Rohu: {selectedCard.fishHistory[0].rohu} gms</p>
                        <p>📏 Katla: {selectedCard.fishHistory[0].katla} gms</p>
                        <p>🍤 Feed: {selectedCard.feed}</p>

                        {/* ✅ Fish Growth (ONLY HERE) */}
                        <div style={styles.payments}>
                            <strong>Fish Growth:</strong>

                            {!selectedCard.fishHistory || selectedCard.fishHistory.length === 0 ? (
                                <p style={{ fontSize: "13px", color: "#777" }}>
                                    No data available
                                </p>
                            ) : (
                                selectedCard.fishHistory.map((r, i) => (
                                    <div key={i} style={styles.paymentRow}>
                                        <span>{r.date}</span>
                                        <span>R: {r.rohu}</span>
                                        <span>K: {r.katla}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            onClick={() => setSelectedCard(null)}
                            style={styles.button}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {selectedInvestment && (
                <div style={styles.overlay} onClick={() => setSelectedInvestment(null)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>{selectedInvestment.place} - Investment</h2>

                            <div style={styles.headerActions}>
                                <button
                                    style={styles.addBtn}
                                    onClick={() => setShowAddModal(true)}
                                >
                                    + Add
                                </button>

                                <button
                                    style={styles.closeIcon}
                                    onClick={() => setSelectedInvestment(null)}
                                >
                                    ✖
                                </button>
                            </div>
                        </div>

                        <div style={styles.table}>
                            <div style={styles.rowHeader}>
                                <span>Date</span>
                                <span>Description</span>
                                <span>Amount</span>
                            </div>

                            {selectedInvestment.history.map((h, i) => (
                                <div key={i} style={styles.row}>
                                    <span>{h.date}</span>
                                    <span>{h.desc}</span>
                                    <span>₹{h.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 ADD MODAL */}
            {showAddModal && (
                <div style={styles.overlay} onClick={() => setShowAddModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Add Investment</h2>
                            <button
                                style={styles.closeIcon}
                                onClick={() => setShowAddModal(false)}
                            >
                                ✖
                            </button>
                        </div>

                        <div style={styles.form}>
                            <input
                                placeholder="Date"
                                style={styles.input}
                                value={newEntry.date}
                                onChange={(e) =>
                                    setNewEntry({ ...newEntry, date: e.target.value })
                                }
                            />

                            <input
                                placeholder="Description"
                                style={styles.input}
                                value={newEntry.desc}
                                onChange={(e) =>
                                    setNewEntry({ ...newEntry, desc: e.target.value })
                                }
                            />

                            <input
                                placeholder="Amount"
                                type="number"
                                style={styles.input}
                                value={newEntry.amount}
                                onChange={(e) =>
                                    setNewEntry({ ...newEntry, amount: e.target.value })
                                }
                            />

                            <div style={styles.actions}>
                                <button style={styles.saveBtn} onClick={handleAdd}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    totalCard: {
        backgroundColor: "#111827",
        color: "#fff",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "12px",
    },

    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "12px",
        border: "1px solid #e5e7eb",
        width: "calc(50% - 6px)", // 🔥 2 cards per row
        boxSizing: "border-box",
    },

    investment: {
        marginTop: "10px",
        fontWeight: "600",
        cursor: "pointer",
        color: "#2563eb",
    },

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,   // 🔥 add
        bottom: 0,  // 🔥 add
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },

    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",

        width: "90%",          // for mobile
        maxWidth: "400px",     // 🔥 LIMIT for desktop
        margin: "0 auto",
        boxSizing: "border-box",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    table: {
        marginTop: "15px",
    },

    rowHeader: {
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
        fontSize: "13px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        fontSize: "13px",
    },
    addBtn: {
        backgroundColor: "#111827",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    closeIcon: {
        background: "#e10e0e",
        border: "none",
        color: "#fff",
        padding: "5px 10px",
        cursor: "pointer",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "10px",
    },

    input: {
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "6px",
    },

    saveBtn: {
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    actions: {
        display: "flex",
        justifyContent: "center",
    },

    headerActions: {
        display: "flex",
        gap: "10px",
    },
    dateRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "10px",
    },
    paymentRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        padding: "4px 0",
        borderBottom: "1px solid #eee",
    },
    payments: {
        marginTop: "10px",
        background: "#f9fafb",
        padding: "10px",
        borderRadius: "8px",

        maxHeight: "150px",
        overflowY: "auto",
    },
    stock: {
        display: "flex",              // ✅ REQUIRED
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "10px",
    }
};

export default InfoCards;