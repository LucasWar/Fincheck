import axios from "axios";
import { localStorageKeys } from "../app/config/localStorageKeys";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

httpClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
