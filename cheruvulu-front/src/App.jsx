import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import EventBox from "./components/EventBox";
import InfoCards from "./components/InfoCards";

import Farmers from "./pages/Farmers";
import Events from "./pages/Events";

import { useEffect, useRef, useState } from "react";
import { api } from "./api/api";
import LoginPage from "./pages/Login";

import { Toaster } from "react-hot-toast";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [overview, setOverview] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const hasFetched = useRef(false);

  const isActive = (path) => location.pathname === path;

  // 🔥 FETCH DATA
  useEffect(() => {

    if (!loggedInUser) return;

    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchData = async () => {

      try {

        const data = await api("OV/overview");

        setOverview(data);

      } catch (err) {

        console.error(err);

      }
    };

    fetchData();

  }, [loggedInUser]);

  return (
    <>
      {/* 🔥 TOASTER MUST BE OUTSIDE */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />

      {/* 🔥 LOGIN PAGE */}
      {!loggedInUser ? (
        <LoginPage
          setLoggedInUser={setLoggedInUser}
        />
      ) : (

        <div className="layout">

          {/* 🔹 SIDEBAR */}
          <div className="sidebar">

            {/* 🔥 LOGO ROW */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth <= 768 ? "6px" : "10px",
                marginBottom: window.innerWidth <= 768 ? "0px" : "30px",
                flexShrink: 0,
              }}
            >

              {/* USER BADGE */}
              <div
                style={{
                  background: "rgb(16 83 90)",
                  color: "#fff",
                  padding: window.innerWidth <= 768 ? "5px 10px" : "7px 14px",
                  borderRadius: "8px",
                  fontSize: window.innerWidth <= 768 ? "11px" : "13px",
                  fontWeight: "600",
                  minWidth: window.innerWidth <= 768 ? "24px" : "32px",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {loggedInUser?.userName}
              </div>

              {/* LOGO */}
              <h2
                className="logo"
                style={{
                  margin: 0,
                  fontSize: window.innerWidth <= 768 ? "16px" : "24px",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                Cheruvulu
              </h2>

            </div>

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

          {/* 🔹 MAIN CONTENT */}
          <div className="main">

            <Routes>

              {/* ✅ OVERVIEW */}
              <Route
                path="/"
                element={
                  <>
                    <EventBox overview={overview} />

                    <div className="dashboard">

                      {/* LEFT */}
                      <div className="left">
                        <InfoCards overview={overview} />
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

              {/* ✅ EVENTS */}
              <Route
                path="/events"
                element={<Events />}
              />

              {/* ✅ FARMERS */}
              <Route
                path="/farmers"
                element={<Farmers />}
              />

            </Routes>

          </div>

        </div>
      )}
    </>
  );
}

export default App;