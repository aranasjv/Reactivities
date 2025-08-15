import axios from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL_DEV || "https://localhost:5001/api"
});

agent.interceptors.response.use(async response => {
  return response;
}, error => {
  const { status, data } = error.response;
  if (status === 404) {
    throw new Error(data.title || "Resource not found");
  }
  if (status === 400) {
    throw new Error(data.title || "Bad request");
  }
  if (status === 500) {
    throw new Error(data.title || "Internal server error");
  }
  throw error;
});

export default agent;