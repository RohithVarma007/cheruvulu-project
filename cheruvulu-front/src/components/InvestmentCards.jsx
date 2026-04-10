import { useState } from "react";
import { PONDS } from "../constants/ponds";

function InvestmentCards() {
    const [selected, setSelected] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEntry, setNewEntry] = useState({
        date: "",
        desc: "",
        amount: "",
    });

    const data = [
        {
            pond: "Mekaladibba 70 A",
            amount: 120000,
            history: [
                { date: "01 Apr", desc: "Seed Purchase", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        {
             pond: "Mekaladibba 80 A",
            amount: 90000,
            history: [{ date: "02 Apr", desc: "Seed", amount: 30000 }],
        },
        {
            pond: "Mekaladibba 7 A",
            amount: 120000,
            history: [
                { date: "01 Apr", desc: "Seed Purchase", amount: 40000 },
                { date: "03 Apr", desc: "Feed", amount: 30000 },
            ],
        },
        
    ];

    const total = data.reduce((sum, item) => sum + item.amount, 0);

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
        setShowAddModal(false); // 🔥 close second modal
    };

    return (
        <>
            {/* MAIN */}
            <div style={styles.container}>
                <div style={styles.totalCard}>
                    <h2>Total Investment</h2>
                    <h1>₹{total.toLocaleString()}</h1>
                </div>

                <div style={styles.cards}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            style={styles.card}
                            onClick={() => setSelected(item)}
                        >
                            <h3 style={styles.title}>{item.pond}</h3>
                            <p style={styles.amount}>₹{item.amount.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔥 POPUP 1 → HISTORY */}
            {selected && (
                <div style={styles.overlay} onClick={() => setSelected(null)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

                        <div style={styles.modalHeader}>
                            <h2>{selected.pond} - Investment</h2>

                            <div style={styles.headerActions}>
                                <button
                                    style={styles.addBtn}
                                    onClick={() => setShowAddModal(true)}
                                >
                                    + Add
                                </button>

                                <button
                                    style={styles.closeIcon}
                                    onClick={() => setSelected(null)}
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

                            {selected.history.map((item, i) => (
                                <div key={i} style={styles.row}>
                                    <span>{item.date}</span>
                                    <span>{item.desc}</span>
                                    <span>₹{item.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 POPUP 2 → ADD FORM */}
            {showAddModal && (
                <div style={styles.overlay} onClick={() => setShowAddModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

                        {/* 🔥 HEADER */}
                        <div style={styles.modalHeader}>
                            <h2>Add Investment</h2>
                            <button
                                style={styles.closeIcon}
                                onClick={() => setShowAddModal(false)}
                            >
                                ✖
                            </button>
                        </div>

                        {/* FORM */}
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

                                {/* <button
                                    style={styles.cancelBtn}
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button> */}

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
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },

    totalCard: {
        backgroundColor: "#111827",
        color: "#fff",
        padding: "25px",
        borderRadius: "12px",
    },

    cards: {
        display: "flex",
        gap: "15px",
    },

    card: {
        width: "150px",      // 👈 control width
        height: "40px",     // 👈 control height
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        width: "500px",
    },

    modalSmall: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        width: "350px",
    },

    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    addBtn: {
        backgroundColor: "#111827",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
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

    table: {
        marginTop: "15px",
    },

    rowHeader: {
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
    },

    closeIcon: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#e10e0e",
    },

    actions: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
    },

    cancelBtn: {
        backgroundColor: "#e5e7eb",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    headerActions: {
        display: "flex",
        gap: "10px",
    },

    title: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "600",
        width: "180px",
    },

    amount: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "500",
        color: "#6b7280",
    },
};

export default InvestmentCards;