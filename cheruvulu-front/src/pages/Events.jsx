import { useState } from "react";
import { PONDS } from "../constants/ponds";

export default function Events() {
    const [search, setSearch] = useState("");
    const [selectedPond, setSelectedPond] = useState("");

    const events = [
        {
            date: "01 Apr 2024",
            pondId: 1,
            detail: "Seed stocking completed",
        },
        {
            date: "03 Apr 2024",
            pondId: 1,
            detail: "Feed increased to 85kg",
        },
        {
            date: "05 Apr 2024",
            pondId: 3,
            detail: "Water treatment done",
        },
        {
            date: "06 Apr 2024",
            pondId: 4,
            detail: "Sampling check",
        },
    ];

    // ✅ Helper to get pond name
    const getPondName = (id) => {
        return PONDS.find((p) => p.id === id)?.name || "";
    };

    // 🔥 FILTER LOGIC
    const filtered = events.filter((e) => {
        const pondName = getPondName(e.pondId);

        const matchesSearch =
            pondName.toLowerCase().includes(search.toLowerCase()) ||
            e.detail.toLowerCase().includes(search.toLowerCase());

        const matchesPond = selectedPond
            ? e.pondId === Number(selectedPond)
            : true;

        return matchesSearch && matchesPond;
    });

    return (
        <div style={styles.container}>
            <h2>Events</h2>

            {/* 🔽 Pond Dropdown */}
            <select
                value={selectedPond}
                onChange={(e) => setSelectedPond(e.target.value)}
                style={styles.dropdown}
            >
                <option value="">All Ponds</option>
                {PONDS.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>

            {/* 🔍 Search */}
            <input
                placeholder="Search by pond or event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.input}
            />

            {/* 📋 Event List */}
            <div style={styles.list}>
                {filtered.length === 0 ? (
                    <p style={{ color: "#777", fontSize: "13px" }}>
                        No events found
                    </p>
                ) : (
                    filtered.map((e, i) => (
                        <div key={i} style={styles.row}>
                            <span style={styles.date}>{e.date}</span>
                            <span style={styles.pond}>{getPondName(e.pondId)}</span>
                            <span style={styles.detail}>{e.detail}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
    },

    dropdown: {
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "10px",
        width: "200px",
    },

    input: {
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "15px",
        width: "100%",
        maxWidth: "300px",
    },

    list: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10px",
        fontSize: "13px",
        padding: "10px",
        borderRadius: "8px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        flexWrap: "wrap", // 🔥 allows wrapping
    },

    date: {
        minWidth: "80px",
        color: "#6b7280",
        fontSize: "12px",
    },

    pond: {
        flex: "1",
        fontWeight: "500",
        wordBreak: "break-word",
    },

    detail: {
        flex: "2",
        textAlign: "left",
        wordBreak: "break-word",
    },
};