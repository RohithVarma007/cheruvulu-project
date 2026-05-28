// const BASE_URL = "http://localhost:8080/";
const BASE_URL = "https://cheruvulu-project.onrender.com/";

export const api = async (
  endpoint,
  method = "GET",
  body = null
) => {

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const url = `${BASE_URL}${endpoint}`;

  console.log("🔥 API CALL:", url);

  const res = await fetch(url, options);

  // 🔥 HANDLE ERROR
  if (!res.ok) {

    const text = await res.text();

    throw new Error(text || "API Error");
  }

  // 🔥 SAFELY HANDLE EMPTY RESPONSE
  const text = await res.text();

  try {

    return text ? JSON.parse(text) : {};

  } catch {

    return text;
  }
};