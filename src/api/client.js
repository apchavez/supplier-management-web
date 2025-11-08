import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

client.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg = err?.response?.data?.message || err.message || "Error de red";
    return Promise.reject(new Error(msg));
  }
);
export async function fetchWelcome() {
  const { data } = await client.get("/api/welcome");
  return data;
}

export async function listProviders(page = 0, size = 20) {
  const { data } = await client.get("/api/providers", {
    params: { page, size },
  });
  return data;
}

export async function addProvider(payload) {
  const { data } = await client.post("/api/providers", payload);
  return data;
}

export async function deleteProvider(id) {
  await client.delete(`/api/providers/${id}`);
}

export default client;
