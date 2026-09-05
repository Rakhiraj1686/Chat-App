import axios from "axios";

// Use the same backend URL as the WebSocket connection (config/WebSocket.jsx)
// so REST calls and the socket always point at the same server, in both
// local dev (.env -> VITE_BACKEND_URL=http://localhost:5000) and production.
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
});

export default api;