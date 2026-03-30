import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  // 🔹 Check backend
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  // 🔹 Fetch all users
  // const getUsers = () => {
  //   fetch("http://localhost:8080/all")
  //     .then(res => res.json())
  //     .then(data => setUsers(data));
  // };

  // 🔹 Add user
  // const addUser = () => {
  //   fetch("http://localhost:8080/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ name: name })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Saved:", data);
  //       setName("");
  //       getUsers(); // refresh list
  //     });
  // };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Project</h1>

      {/* Backend status */}
      <h3>{message}</h3>

      {/* Add user */}
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
      </div>
{/* <button onClick={addUser}>Add User</button> */}
      {/* Load users
      <div style={{ marginTop: "20px" }}>
        <button onClick={getUsers}>Load Users</button>

        <ul>
          {users.map((u, index) => (
            <li key={index}>
              {u.id} - {u.name}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;