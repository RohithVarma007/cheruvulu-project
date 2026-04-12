import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import EventBox from "./components/EventBox";
import InfoCards from "./components/InfoCards";
import Farmers from "./pages/Farmers";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      {/* 🔹 Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Cheruvulu</h2>

        <div>
          <p
            className={isActive("/") ? "menuActive" : "menuItem"}
            onClick={() => navigate("/")}
          >
            Overview
          </p>

          <p
            className={isActive("/events") ? "menuActive" : "menuItem"}
            onClick={() => navigate("/events")}
          >
            Events
          </p>

          <p
            className={isActive("/farmers") ? "menuActive" : "menuItem"}
            onClick={() => navigate("/farmers")}
          >
            Farmers
          </p>
        </div>
      </div>

      {/* 🔹 Main Content */}
      <div className="main">
        <Routes>
          {/* ✅ Overview */}
          <Route
            path="/"
            element={
              <>
                <EventBox text="Shrimp harvest completed 🎉 | Feed updated | Water quality good ✅" />

                <div className="dashboard">
                  {/* LEFT */}
                  <div className="left">
                    <InfoCards />
                  </div>

                  {/* RIGHT */}
                  <div className="right">
                    <div className="calendarCard">
                      <h3>📅 Calendar</h3>
                      <div className="calendarBox">
                        Future Calendar / Charts
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />

          {/* ✅ Farmers */}
          <Route path="/farmers" element={<Farmers />} />

          {/* ✅ Events */}
          <Route path="/events" element={<h2>Events Page</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;