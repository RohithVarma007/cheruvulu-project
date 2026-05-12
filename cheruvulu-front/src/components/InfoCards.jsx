import { useState, useRef, useEffect } from "react";
import { api } from "../api/api";

function InfoCards() {
    const [selectedCard, setSelectedCard] = useState(null);     // for card popup
    const [selectedInvestment, setSelectedInvestment] = useState(null); // for amount popup
    const [showAddModal, setShowAddModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showNetWeightModal, setShowNetWeightModal] = useState(false);
    const menuRef = useRef(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editRow, setEditRow] = useState({});
    const [showHarvestModal, setShowHarvestModal] = useState(false);
    const [overview, setOverview] = useState(null);
    const hasFetched = useRef(false);
    const [selectHistory, setSelectHistory] = useState([]);

    const [harvestEntry, setHarvestEntry] = useState({
        date: "",
        tonnes: "",
        count: "",
        price: "",
    });

    const [netWeightEntry, setNetWeightEntry] = useState({
        date: "",
        rohu: "",
        katla: "",
    });

    const [newEntry, setNewEntry] = useState({
        date: "",
        desc: "",
        amount: "",
    });

    const getInitialStock = (card) => {
        return Number(card.totalStock || card.stock || 0);
    };

    // const handleNetWeightAdd = () => {
    //     if (!netWeightEntry.date || !netWeightEntry.rohu || !netWeightEntry.katla) return;

    //     const updated = {
    //         ...selectedCard,
    //         fishHistory: [
    //             ...(selectedCard.fishHistory || []),
    //             {
    //                 date: netWeightEntry.date,
    //                 rohu: netWeightEntry.rohu,
    //                 katla: netWeightEntry.katla,
    //             },
    //         ],
    //     };

    //     setSelectedCard(updated);
    //     setNetWeightEntry({ date: "", rohu: "", katla: "" });
    //     setShowNetWeightModal(false);
    // };

    const handleHarvestSave = () => {
        const tonnes = Number(harvestEntry.tonnes || 0);
        const price = Number(harvestEntry.price || 0);

        const revenue = tonnes * price;

        const baseStock = getInitialStock(selectedCard);

        const currentStock =
            selectedCard.leftStock !== undefined
                ? selectedCard.leftStock
                : baseStock;

        const updated = {
            ...selectedCard,
            totalStock: baseStock, // ✅ ensure base stock exists
            leftStock: Math.max(currentStock - tonnes, 0), // ✅ prevent negative
            harvestHistory: [
                ...(selectedCard.harvestHistory || []),
                {
                    ...harvestEntry,
                    revenue,
                },
            ],
        };

        setSelectedCard(updated);
        setShowHarvestModal(false);

        setHarvestEntry({
            date: "",
            tonnes: "",
            count: "",
            price: "",
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        console.log("🔥 useEffect triggered");

        const fetchOverview = async () => {
            try {
                const data = await api("overview");
                console.log("Overview:", data);
                setOverview(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOverview();
    }, []);


    // const data = [
    //     {
    //         id: 1,
    //         place: "Mekaladibba 70 A",
    //         feed: "85 kg/day",
    //         startDate: "2024-04-01",
    //         endDate: "2024-04-06",
    //         investment: 120000,
    //         cropType: "Fish",
    //         stock: "r-12000,k-800",
    //         totalFeed: "0",
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //         fishHistory: [
    //             { date: "01 Apr", rohu: "200", katla: "800" },
    //             { date: "03 Apr", rohu: "400", katla: "1200" },
    //             { date: "06 Apr", rohu: "800 ", katla: "1600" },
    //             { date: "06 Apr", rohu: "800 ", katla: "1600" },
    //             { date: "06 Apr", rohu: "800 ", katla: "1600" },
    //             { date: "06 Apr", rohu: "800 ", katla: "1600" },
    //         ],
    //         harvestHistory: [] // ✅ ADD
    //     },
    //     {
    //         id: 2,
    //         place: "Mekaladibba 80 A",
    //         feed: "60 kg/day",
    //         investment: 90000,
    //         cropType: "Shrimp",
    //         totalFeed: "1200",
    //         stock: "300000",
    //         startDate: "2024-04-01",
    //         endDate: "2024-04-06",
    //         history: [{ date: "02 Apr", desc: "Seed", amount: 30000 }],
    //         shrimpFeedHistory: [
    //             { date: "2026-04-13", am7: 23, am10: 25, pm1: 20, pm4: 25 }
    //         ],
    //         harvestHistory: [] // ✅ ADD
    //     },
    //     {
    //         id: 3,
    //         place: "Gunnapudi 75 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 7710000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 4,
    //         place: "Kalingapeta 65 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 5,
    //         place: "Mekaladibba 7 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 6,
    //         place: "Mekaladibba 13 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 7,
    //         place: "Mekaladibba 18 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 8,
    //         place: "Mekaladibba 3 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    //     {
    //         id: 9,
    //         place: "Mekaladibba 1 A",
    //         Rohu: "800 gms",
    //         Katla: "2900 gms",
    //         feed: "85 kg/day",
    //         investment: 120000,
    //         history: [
    //             { date: "01 Apr", desc: "Seed", amount: 40000 },
    //             { date: "03 Apr", desc: "Feed", amount: 30000 },
    //         ],
    //     },
    // ];

    const calculateDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();

        const diffTime = endDate - startDate;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const totalInvestment = overview?.ponds?.reduce(
        (sum, item) => sum + (item.totalInvestment || 0),
        0
    ) || 0;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const handleAdd = async () => {
        if (!newEntry.date || !newEntry.desc || !newEntry.amount) {
            alert("All fields are required");
            return;
        }

        try {
            const payload = {
                date: newEntry.date,
                description: newEntry.desc,
                amount: Number(newEntry.amount),
                pond: { id: selectedInvestment.pondId } // 🔥 only ID
            };

            const res = await api("saveInvestment", "POST", payload);

            // 🔥 update UI instantly
            const newRow = {
                date: newEntry.date,
                desc: newEntry.desc,
                amount: Number(newEntry.amount),
            };

            setSelectedInvestment((prev) => ({
                ...prev,
                history: [...(prev.history || []), newRow],
                totalInvestment:
                    (prev.totalInvestment || 0) + Number(newEntry.amount),
            }));

            // 🔥 reset form
            setNewEntry({ date: "", desc: "", amount: "" });
            setShowAddModal(false);

            alert(res?.message || "Investment saved successfully");

        } catch (err) {
            console.error(err);
            alert("Failed to save investment");
        }
    };

    const formatDate = (value) => {
        if (!value) return "-";
        const [year, month, day] = value.split("-");
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            {/* 🔥 TOTAL INVESTMENT */}
            <div style={styles.totalCard}>
                <h2>Total Investment</h2>
                <h1>₹{overview?.grandTotal?.toLocaleString() || 0}</h1>
            </div>

            {/* 🔥 CARDS */}
            <div style={styles.container}>
                {overview?.ponds?.map((item) => (
                    <div
                        key={item.pondId}
                        style={styles.card}
                        onClick={async () => {
                            try {
                                const pondData = await api(`pond/${item.pondId}`);

                                if (pondData.cropType === "Fish") {
                                    const fishData = await api(`fishgrowth/${item.pondId}`);

                                    const formatted = fishData.map(f => ({
                                        date: f.date,
                                        rohu: f.rohuGrams,
                                        katla: f.katlaGrams
                                    }));

                                    setSelectedCard(pondData);
                                    setSelectHistory(formatted);

                                } else if (pondData.cropType === "Shrimp") {
                                    const shrimpData = await api(`shrimpfeed/${item.pondId}`);

                                    setSelectedCard(pondData);
                                    setSelectHistory(shrimpData);
                                }

                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        <h3>{item.pondName}</h3>

                        {item.presentRohu > 0 || item.presentKatla > 0 ? (
                            <>
                                <p>🐟 Rohu: {item.presentRohu} gms</p>
                                <p>🐠 Katla: {item.presentKatla} gms</p>
                            </>
                        ) : (
                            <>
                                <p>🦐 Total Feed: {selectedCard != null ? selectedCard?.totalFeedShrimp : 0}</p>
                                <p>📊 Latest Count: {item.latestCount}</p>
                            </>
                        )}

                        {/* 🔥 CLICKABLE INVESTMENT */}
                        <p
                            style={styles.investment}
                            onClick={async (e) => {
                                e.stopPropagation();

                                try {
                                    const data = await api(`expensesHistroy/${item.pondId}`);

                                    const formattedHistory = data.map(d => ({
                                        id: d.id,
                                        date: d.date,
                                        desc: d.description || "-",
                                        amount: d.amount,
                                    }));

                                    const total = formattedHistory.reduce(
                                        (sum, h) => sum + (h.amount || 0),
                                        0
                                    );

                                    setSelectedInvestment({
                                        ...item,
                                        history: formattedHistory,
                                        totalInvestment: total, // optional override
                                    });

                                } catch (err) {
                                    console.error(err);
                                    setSelectedInvestment({
                                        ...item,
                                        history: [],
                                    });
                                }
                            }}
                        >
                            💰 ₹{item.totalInvestment?.toLocaleString()}
                        </p>

                        {/* 🔥 PREVIOUS DATA */}
                        {(item.previousRohu > 0 || item.previousKatla > 0) && (
                            <div style={styles.prevText}>
                                Prev → R: {item.previousRohu} | K: {item.previousKatla}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 🔥 POPUP → HISTORY */}
            {selectedCard && (
                <div
                    style={styles.overlay}
                    onClick={() => {
                        setSelectedCard(null);
                        setShowMenu(false); // ✅ FIX: close menu also
                    }}
                >
                    <div
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={styles.header}>
                            <h2>{selectedCard.name}</h2>

                            <div style={{ position: "relative" }}>
                                {/* 3-dot button */}
                                <button
                                    style={styles.menuBtn}
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    ⋮
                                </button>

                                {/* Dropdown */}
                                {showMenu && (
                                    <div style={styles.menu} ref={menuRef}>
                                        {selectedCard.cropType === 'Fish' && (<div style={styles.menuItem}
                                            onClick={() => { setShowNetWeightModal(true); setShowMenu(false); }}>
                                            Add Net Weight
                                        </div>)}
                                        <div
                                            style={styles.menuItem}
                                            onClick={() => { setShowHarvestModal(true); setShowMenu(false); }}>
                                            Middle Harvest
                                        </div>
                                        <div style={styles.menuItem}>Harvest</div>
                                        <div style={styles.menuItem}>New Crop</div>
                                    </div>

                                )}
                            </div>
                        </div>

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
                            <span>
                                Stock {
                                    getInitialStock(selectedCard) -
                                    ((selectedCard.rohuStock || 0) + (selectedCard.katlaStock || 0))
                                }
                            </span>

                            {selectedCard.cropType === "Shrimp" && (
                                <span>
                                    Left: {
                                        selectedCard.leftStock !== undefined
                                            ? selectedCard.leftStock
                                            : getInitialStock(selectedCard)
                                    }
                                </span>
                            )}

                            {selectedCard.cropType === "Fish" && (
                                <>
                                    {/* 🔥 DOB Bags (center) */}
                                    <span>
                                        DOB: {selectedCard.dobBags || 0}
                                    </span>

                                    {/* 🔥 Dead Fish */}
                                    <span>
                                        Dead: {(selectedCard.rohuDead || 0) + (selectedCard.katlaDead || 0)}
                                    </span>


                                    {/* 🔥 Left Count
                                    <span>
                                        Left: {
                                            getInitialStock(selectedCard) -
                                            ((selectedCard.rohuDead || 0) + (selectedCard.katlaDead || 0))
                                        }
                                    </span> */}
                                </>
                            )}
                        </div>

                        <div>
                            {selectedCard.cropType === "Fish" ? (
                                <>
                                    <p>🐟 Rohu: {selectHistory?.[0]?.rohu} gms</p>
                                    <p>🐠 Katla: {selectHistory?.[0]?.katla} gms</p>
                                </>
                            ) : selectedCard.cropType === "Shrimp" ? (
                                <>
                                    <p>🦐 Total Feed : {selectedCard?.totalFeedShrimp}</p>
                                    <p> Feed: {selectedCard.feed}</p>
                                </>
                            ) : null}
                        </div>

                        {/* ✅ Fish Growth */}
                        {selectedCard.cropType === "Fish" && (
                            <div style={styles.payments}>
                                <strong>Fish Growth:</strong>

                                {!selectHistory || selectHistory.length === 0 ? (
                                    <p style={{ fontSize: "13px", color: "#777" }}>
                                        No data available
                                    </p>
                                ) : (
                                    selectHistory.map((r, i) => (
                                        <div key={i} style={styles.paymentRow}>
                                            <span>{r.date}</span>
                                            <span>R: {r.rohu}</span>
                                            <span>K: {r.katla}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {selectedCard.cropType === "Shrimp" && (
                            <div style={styles.payments}>
                                <strong>Shrimp Feed</strong>

                                {!selectHistory || selectHistory.length === 0 ? (
                                    <p style={{ fontSize: "13px", color: "#777" }}>
                                        No data available
                                    </p>
                                ) : (
                                    <>
                                        {/* Header */}
                                        <div style={styles.paymentRow}>
                                            <span>Date</span>
                                            <span>7 AM</span>
                                            <span>10 AM</span>
                                            <span>1 PM</span>
                                            <span>4 PM</span>
                                            <span>Action</span>
                                        </div>

                                        {/* Data */}
                                        {selectHistory.map((r, i) => (
                                            <div key={i} style={styles.paymentRow}>
                                                {editIndex === i ? (
                                                    <>
                                                        {/* EDIT MODE */}
                                                        <input
                                                            value={editRow.date}
                                                            onChange={(e) =>
                                                                setEditRow({ ...editRow, date: e.target.value })
                                                            }
                                                            style={styles.editInput}
                                                        />
                                                        <input
                                                            value={editRow.feed7am}
                                                            onChange={(e) =>
                                                                setEditRow({ ...editRow, feed7am: e.target.value })
                                                            }
                                                            style={styles.editInput}
                                                        />
                                                        <input
                                                            value={editRow.feed10am}
                                                            onChange={(e) =>
                                                                setEditRow({ ...editRow, feed10am: e.target.value })
                                                            }
                                                            style={styles.editInput}
                                                        />
                                                        <input
                                                            value={editRow.feed1pm}
                                                            onChange={(e) =>
                                                                setEditRow({ ...editRow, feed1pm: e.target.value })
                                                            }
                                                            style={styles.editInput}
                                                        />
                                                        <input
                                                            value={editRow.feed4pm}
                                                            onChange={(e) =>
                                                                setEditRow({ ...editRow, feed4pm: e.target.value })
                                                            }
                                                            style={styles.editInput}
                                                        />

                                                        {/* Save */}
                                                        <button
                                                            onClick={() => {
                                                                const updated = [...selectHistory];
                                                                updated[i] = editRow;

                                                                setSelectHistory(updated);
                                                                setEditIndex(null);

                                                                // OPTIONAL: call API to persist
                                                                // await api.put(`shrimpgrowth/${editRow.id}`, editRow);
                                                            }}
                                                        >
                                                            💾
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* VIEW MODE */}
                                                        <span>{formatDate(r.date)}</span>
                                                        <span>{r.feed7am}</span>
                                                        <span>{r.feed10am}</span>
                                                        <span>{r.feed1pm}</span>
                                                        <span>{r.feed4pm}</span>

                                                        {/* Edit button */}
                                                        <button
                                                            onClick={() => {
                                                                setEditIndex(i);
                                                                setEditRow({ ...r });
                                                            }}
                                                        >
                                                            ✏️
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setSelectedCard(null);
                                setShowMenu(false); // ✅ FIX here also
                            }}
                            style={styles.button}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            {showNetWeightModal && (
                <div style={styles.overlay} onClick={() => setShowNetWeightModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Add Net Weight</h2>
                            <button
                                style={styles.closeIcon}
                                onClick={() => setShowNetWeightModal(false)}
                            >
                                ✖
                            </button>
                        </div>

                        <div style={styles.form}>
                            <input
                                type="date"
                                style={styles.input}
                                value={netWeightEntry.date}
                                onChange={(e) =>
                                    setNetWeightEntry({ ...netWeightEntry, date: e.target.value })
                                }
                            />
                            <input
                                placeholder="Rohu"
                                style={styles.input}
                                value={netWeightEntry.rohu}
                                onChange={(e) =>
                                    setNetWeightEntry({ ...netWeightEntry, rohu: e.target.value })
                                }
                            />

                            <input
                                placeholder="Katla"
                                style={styles.input}
                                value={netWeightEntry.katla}
                                onChange={(e) =>
                                    setNetWeightEntry({ ...netWeightEntry, katla: e.target.value })
                                }
                            />

                            <div style={styles.actions}>
                                <button style={styles.saveBtn} onClick={handleNetWeightAdd}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showHarvestModal && (
                <div style={styles.overlay} onClick={() => setShowHarvestModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Middle Harvest</h2>
                            <button
                                style={styles.closeIcon}
                                onClick={() => setShowHarvestModal(false)}
                            >
                                ✖
                            </button>
                        </div>

                        <div style={styles.form}>
                            <input
                                type="date"
                                style={styles.input}
                                value={harvestEntry.date}
                                onChange={(e) =>
                                    setHarvestEntry({ ...harvestEntry, date: e.target.value })
                                }
                            />

                            <input
                                placeholder="Tonnes"
                                style={styles.input}
                                value={harvestEntry.tonnes}
                                onChange={(e) =>
                                    setHarvestEntry({ ...harvestEntry, tonnes: e.target.value })
                                }
                            />

                            <input
                                placeholder="Count"
                                style={styles.input}
                                value={harvestEntry.count}
                                onChange={(e) =>
                                    setHarvestEntry({ ...harvestEntry, count: e.target.value })
                                }
                            />

                            <input
                                placeholder="Price (optional)"
                                style={styles.input}
                                value={harvestEntry.price}
                                onChange={(e) =>
                                    setHarvestEntry({ ...harvestEntry, price: e.target.value })
                                }
                            />

                            <button style={styles.saveBtn} onClick={handleHarvestSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedInvestment && (
                <div style={styles.overlay} onClick={() => setSelectedInvestment(null)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>{selectedInvestment.pondName} - Investment</h2>

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

                            {selectedInvestment.history?.length ? (
                                selectedInvestment.history.map((h, i) => (
                                    <div key={h.id || i} style={styles.row}>
                                        <span>{h.date}</span>
                                        <span>{h.desc}</span>
                                        <span>₹{h.amount.toLocaleString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: "13px", color: "#777" }}>No data</p>
                            )}
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
                                type="date"
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
        display: "flex",
        justifyContent: "space-between", // 🔥 important
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "10px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    menuBtn: {
        background: "rgba(0,0,0,0.1)",
        color: "black",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },

    menu: {
        position: "absolute",
        right: 0,
        top: "30px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "150px",
        zIndex: 10,
    },

    menuItem: {
        padding: "10px",
        fontSize: "13px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
    },

    prevText: {
        fontSize: "11px",
        color: "#6b7280",
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "4px",
    },

    editInput: {
        width: "50px",
        padding: "4px",
        fontSize: "12px",
    },

};

export default InfoCards;
