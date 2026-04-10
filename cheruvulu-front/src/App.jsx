import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import EventBox from "./components/EventBox";
import InfoCards from "./components/InfoCards";
import InvestmentCards from "./components/InvestmentCards";
import Navbar from "./components/Navbar";
import Farmers from "./pages/Farmers";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.layout}>
      {/* 🔹 Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cheruvulu</h2>

        <div>
          <p
            style={isActive("/") ? styles.menuActive : styles.menuItem}
            onClick={() => navigate("/")}
          >
            Overview
          </p>

          <p
            style={isActive("/events") ? styles.menuActive : styles.menuItem}
            onClick={() => navigate("/events")}
          >
            Events
          </p>

          <p
            style={isActive("/farmers") ? styles.menuActive : styles.menuItem}
            onClick={() => navigate("/farmers")}
          >
            Farmers
          </p>
        </div>
      </div>

      {/* 🔹 Main Content */}
      <div style={styles.main}>
        <Routes>
          {/* ✅ Overview Page (Your Dashboard) */}
          <Route
            path="/"
            element={
              <>
                {/* Event */}
                <EventBox text="Shrimp harvest completed 🎉 | Feed updated | Water quality good ✅" />

                {/* Dashboard */}
                <div style={styles.dashboard}>
                  {/* LEFT */}
                  <div style={styles.left}>
                    <InvestmentCards />
                    <InfoCards />
                  </div>

                  {/* RIGHT */}
                  <div style={styles.right}>
                    <div style={styles.calendarCard}>
                      <h3>📅 Calendar</h3>
                      <div style={styles.calendarBox}>
                        Future Calendar / Charts
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />

          {/* ✅ Farmers Page */}
          <Route path="/farmers" element={<Farmers />} />

          {/* ✅ Events Page */}
          <Route  path="/events"  element={<h2>Events Page</h2>} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },

  sidebar: {
    width: "170px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRight: "1px solid #e5e7eb",
  },

  logo: {
    marginBottom: "30px",
    color: "#293a53",
  },

  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f9fafb",
  },

  menuItem: {
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#374151",
  },

  menuActive: {
    backgroundColor: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "600",
    color: "#111827",
  },

  dashboard: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  left: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  right: {
    flex: 1.3,
  },

  calendarCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  calendarBox: {
    marginTop: "10px",
    padding: "20px",
    border: "1px dashed #ddd",
    borderRadius: "10px",
    height: "210px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
  },
};

export default App;