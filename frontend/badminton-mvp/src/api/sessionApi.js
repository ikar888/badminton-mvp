import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createSession = async (sessionData) => {
  const res = await axios.post(
    `${API_URL}/api/v1/sessions`,
    sessionData,
    { withCredentials: true }
  );

  return res.data;
};