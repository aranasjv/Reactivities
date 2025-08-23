import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/Routes";

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
  async (error) => {
    store.uiStore.isIdle();
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          if(data.errors)
          {
            const modalStateErrors = [];
            for(const key in data.errors)
            {
              modalStateErrors.push(data.errors[key])
            }
            throw modalStateErrors.flat();
          }
          else{
            toast.error(data);
          }
          break;
        case 401:
          toast.error('Unauthorized');
          break;
        case 404:
          router.navigate('/not-found');
          break;
        case 500:
          router.navigate('/server-error', {state: {error:data}});
          break;
        default:
          break;
      }

      return Promise.reject(error);
    }
  }
);


export default agent;