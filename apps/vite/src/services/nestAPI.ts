import axios from "axios";
import { clearUser } from "../store/user";
import { store } from "../store";
const { VITE_API_URL } = import.meta.env;

export const nestAPI = axios.create({
  baseURL: VITE_API_URL,
});

nestAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);
