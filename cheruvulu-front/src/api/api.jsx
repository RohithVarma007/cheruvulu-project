// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://cheruvulu-project.vercel.app";

// 🔥 generic API handler
export const api = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const url = `${BASE_URL + "OV/"}${endpoint}`;
  console.log("🔥 API CALL:", url);   // 👈 ADD THIS

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  return res.json();
};