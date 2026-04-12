import { useState } from "react";

export default function Farmers() {
    const ACRE_PRICE = 66000;

    const [selectedPondId, setSelectedPondId] = useState("");
    const [search, setSearch] = useState("");
    const [selectedFarmer, setSelectedFarmer] = useState(null);

    const ponds = [
        {
            id: 1,
            name: "Mekaladibba 70 A",
            farmers: [
                {
                    name: "Ramesh",
                    cents: 20,
                    bank: "SBI - 123456",
                    IFSC: "ISBIN00998",
                    payments: [
                        { date: "01 Apr 2025", mode: "Cash", amount: 10000 },
                        { date: "05 Apr 2026", mode: "UPI", amount: 5000 },
                    ]
                },
            ],
        },
        {
            id: 2,
            name: "Gunnapudi 75 A",
            farmers: [
                {
                    name: "Suresh",
                    cents: 50,
                    bank: "HDFC - 987654",
                    payments: [
                        { date: "01 Apr", mode: "Cash", amount: 10000 },
                        { date: "05 Apr", mode: "UPI", amount: 5000 },
                    ]
                },
                {
                    name: "Naresh",
                    cents: 30,
                    bank: "ICICI - 555666",
                    payments: [
                        { date: "01 Apr", mode: "Cash", amount: 10000 },
                        { date: "05 Apr", mode: "UPI", amount: 5000 },
                    ]
                },
            ],
        },
        {
            id: 3,
            name: "Kalingapeta 65 A",
            farmers: [
                {
                    name: "Mahesh",
                    cents: 40,
                    bank: "Axis - 222333",
                    payments: [
                        { date: "01 Apr", mode: "Cash", amount: 10000 },
                        { date: "05 Apr", mode: "UPI", amount: 5000 },
                    ]
                },
            ],
        },
    ];

    const selectedPond = ponds.find(
        (p) => p.id === Number(selectedPondId)
    );

    const calculateLease = (cents) => {
        return (ACRE_PRICE * cents) / 100;
    };

    const filteredFarmers =
        selectedPond?.farmers.filter((f) =>
            f.name.toLowerCase().includes(search.toLowerCase())
        ) || [];

    return (
        <div style={styles.container}>
            <h2>Farmers List</h2>

            {/* 🔽 Pond Dropdown */}
            <select
                value={selectedPondId}
                onChange={(e) => {
                    setSelectedPondId(e.target.value);
                    setSearch("");
                }}
                style={styles.dropdown}
            >
                <option value="">Select Pond</option>
                {ponds.map((pond) => (
                    <option key={pond.id} value={pond.id}>
                        {pond.name}
                    </option>
                ))}
            </select>

            {/* 🔍 Search */}
            {selectedPond && (
                <input
                    placeholder="Search farmer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.search}
                />
            )}

            {/* 👨‍🌾 Farmers LIST ONLY (name + cents) */}
            {selectedPond && (
                <div style={styles.list}>
                    {filteredFarmers.map((farmer, index) => (
                        <div
                            key={index}
                            style={styles.card}
                            onClick={() => setSelectedFarmer(farmer)}
                        >
                            <p style={styles.name}>{farmer.name}</p>
                            <p style={styles.cents}>{farmer.cents} cents</p>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔥 POPUP → Farmer Details */}
            {selectedFarmer && (
                <div
                    style={styles.overlay}
                    onClick={() => setSelectedFarmer(null)}
                >
                    <div
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selectedFarmer.name}</h2>

                        <p>🌾 Land: {selectedFarmer.cents} cents</p>
                        <p>🏦 Bank: {selectedFarmer.bank}</p>
                        <p>IFSC code: {selectedFarmer.IFSC}</p>
                        <p>💰 Lease: ₹ {ACRE_PRICE}</p>
                        <p> Farmer Lease : ₹ {calculateLease(selectedFarmer.cents).toLocaleString()}</p>


                        {/* <p>
                            ✅ Paid: ₹
                            {selectedFarmer.payments
                                .reduce((sum, p) => sum + p.amount, 0)
                                .toLocaleString()}
                        </p> */}

                        {/* <p style={{ color: "red" }}>
                            ❗ Remaining: ₹
                            {(
                                calculateLease(selectedFarmer.cents) -
                                selectedFarmer.payments.reduce((sum, p) => sum + p.amount, 0)
                            ).toLocaleString()}
                        </p> */}

                        {/* 🔥 Payments List */}
                        <div style={styles.payments}>
                            <strong>Previous Payments:</strong>

                            {selectedFarmer.payments.length === 0 ? (
                                <p style={{ fontSize: "13px", color: "#777" }}>
                                    No payments yet
                                </p>
                            ) : (
                                selectedFarmer.payments.map((p, i) => (
                                    <div key={i} style={styles.paymentRow}>
                                        <span>{p.date}</span>
                                        <span>{p.mode}</span>
                                        <span>₹{p.amount.toLocaleString()}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            style={styles.closeBtn}
                            onClick={() => setSelectedFarmer(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
    },

    dropdown: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "15px",
        width: "250px",
    },

    search: {
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "15px",
        width: "250px",
    },

    list: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    card: {
        background: "#fff",
        padding: "10px 12px",
        borderRadius: "10px",
        border: "1px solid #84484e",
        cursor: "pointer",

        display: "flex",            
        justifyContent: "space-between",
        alignItems: "center",
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
        zIndex: 9999,
    },

    modal: {
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
    },

    payments: {
        marginTop: "10px",
        background: "#f9fafb",
        padding: "10px",
        borderRadius: "8px",
    },

    closeBtn: {
        marginTop: "15px",
        padding: "8px 12px",
        border: "none",
        background: "#111827",
        color: "#fff",
        borderRadius: "6px",
        cursor: "pointer",
    },
    name: {
        fontSize: "14px",           
        fontWeight: "500",
        margin: 0,
        color: "#111827",
    },

    cents: {
        fontSize: "13px",
        color: "#111827",
    },

    paymentRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        padding: "4px 0",
        borderBottom: "1px solid #eee",
    },
};