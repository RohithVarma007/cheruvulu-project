import { useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

function LoginPage({ setLoggedInUser }) {

  const [selectedUser, setSelectedUser] = useState("");
  const [pin, setPin] = useState("");
  const [showPinBox, setShowPinBox] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleUserClick = (user) => {

    setSelectedUser(user);

    setShowPinBox(true);

    setPin("");
  };

  const handleLogin = async () => {

    if (pin.length !== 4) {
      alert("Enter 4 digit PIN");
      return;
    }

    try {

      setLoading(true);

      const data = await api(
        "auth/login",
        "POST",
        {
          userName: selectedUser,
          pin: pin,
        }
      );

      console.log("✅ LOGIN RESPONSE:", data);

      // 🔥 SAVE LOGIN
      localStorage.setItem("loggedInUser",JSON.stringify(data));


      // 🔥 UPDATE APP STATE
      setLoggedInUser(data);

      toast.success("Login Success");

    } catch (err) {

      console.error(err);

      toast.error("Invalid PIN");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Select User
        </h2>

        <div style={styles.buttonRow}>

          <button
            style={styles.userBtn}
            onClick={() => handleUserClick("N")}
          >
            N
          </button>

          <button
            style={styles.userBtn}
            onClick={() => handleUserClick("S")}
          >
            S
          </button>

          <button
            style={styles.userBtn}
            onClick={() => handleUserClick("R")}
          >
            R
          </button>

        </div>

        {showPinBox && (

          <div style={styles.pinBox}>

            <h3 style={styles.userTitle}>
              {selectedUser} Login
            </h3>

            <input
              type="password"
              maxLength={4}
              placeholder="Enter PIN"
              value={pin}
              style={styles.input}
              onChange={(e) =>
                setPin(e.target.value)
              }
            />

            <button
              style={styles.loginBtn}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Login"}
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "16px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  title: {
    margin: 0,
    color: "#111827",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "25px",
  },

  userBtn: {
    width: "75px",
    height: "75px",
    borderRadius: "14px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "26px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.2s",
  },

  pinBox: {
    marginTop: "28px",
  },

  userTitle: {
    marginBottom: "14px",
    color: "#374151",
  },

  input: {
    width: "92%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
  },

  loginBtn: {
    width: "100%",
    marginTop: "16px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },
};

export default LoginPage;