import { useState } from "react";

function InfoCards() {
    const [selected, setSelected] = useState(null);

    const data = [
        {
            id: 1,
            place: "Gunnapudi 75A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "85 kg/day",
            abw: "45 count",
        },
        {
            id: 2,
            place: "Kalingapeta 65A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "60 kg/day",
            abw: "50 count",
        },
        {
            id: 3,
            place: "Mekaladibha 70A",
            Rohu: "800 gms",
            Katla: "2900 gms",
            feed: "100 kg/day",
            abw: "40 count",
        },
        {
            id: 4,
            place: "Mekaladibha 80A",
            Rohu: "1500 gms",
            Katla: "2900 gms",
            feed: "100 kg/day",
            abw: "40 count",
        },
    ];

    return (
        <>
            <div style={styles.container}>
                {data.map((item) => (
                    <div
                        key={item.id}
                        style={styles.card}
                        onClick={() => setSelected(item)} // 👈 open popup
                    >
                        <h3>{item.place}</h3>
                        <p>📏 Rohu: {item.Rohu}</p>
                        <p>📏 Katla: {item.Katla}</p>
                        <p>🌾 Acres: {item.acres}</p>
                    </div>
                ))}
            </div>

            {/* ✅ Popup Modal */}
            {selected && (
                <div style={styles.overlay} onClick={() => setSelected(null)}>
                    <div
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
                    >
                        <h2>{selected.place}</h2>
                        <p>📏 Size: {selected.size}</p>
                        <p>🌾 Acres: {selected.acres}</p>
                        <p>🍤 Feed: {selected.feed}</p>
                        <p>📊 ABW: {selected.abw}</p>

                        <button onClick={() => setSelected(null)} style={styles.button}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    container: {
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        width: "500px",          // ✅ increased width
        maxWidth: "90%",         // ✅ responsive for small screens
        textAlign: "left",       // ✅ better alignment
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    button: {
        marginTop: "15px",
        padding: "8px 15px",
        border: "none",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default InfoCards;