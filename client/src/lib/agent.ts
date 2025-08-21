import axios from "axios";
import { store } from "./stores/store";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL_DEV || "https://localhost:5001/api"
});


agent.interceptors.request.use(config => {
  store.uiStore.isBusy();
  return config;
}
)

agent.interceptors.response.use(
  async (response) => {
    store.uiStore.isIdle();
    return response;
  },
  (error) => {
    store.uiStore.isIdle();

    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        throw new Error(data?.title || "Resource not found");
      }
      if (status === 400) {
        throw new Error(data?.title || "Bad request");
      }
      if (status === 500) {
        throw new Error(data?.title || "Internal server error");
      }
    } else {
      // Handle network or unknown errors
      throw new Error("Network error or no response received");
    }

    throw error;
  }
);


export default agent;