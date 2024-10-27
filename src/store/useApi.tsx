import { useAuth } from "./useAuth"; 
import axios from "axios";
import { CustomAxiosErrorType } from "./index";

let baseUrl = ".";
const errorFunction =
  (loggedIn: boolean, logout: CallableFunction) =>
  (error: any): Promise<CustomAxiosErrorType> => {
    return Promise.reject({ axiosError: error, loggedIn, logout });
  };

const getHeader = (loggedIn: boolean, authToken: any) => ({
  headers: {
    ...(loggedIn
      ? { Authorization: `Bearer ${authToken}`, Accept: "application/json" }
      : {}),
  },
});

export const useAxios = () => {
  const {
    onLogout,
  } = useAuth();
  const token: any = ""
  const loggedIn = !!token && token !== "";
  const authHeader = getHeader(loggedIn, token);
  
  const instance = axios.create({
    baseURL: baseUrl + "/api/",
    ...authHeader,
  });
  instance.interceptors.response.use(function (response) {
    return response;
  }, errorFunction(loggedIn, onLogout));

  return instance;
};