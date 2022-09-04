import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
      const url = config.url;
      if(url.includes('register') || url.includes('squeese')) {
        config.headers = {
            ...config.headers,
            'Accept': 'application/json'
          }
      } else if(url.includes('login')) {
        config.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      } else if(url.includes('squeeze') || url.includes('statistics')) {
        const accessToken = localStorageService?.getAccessToken();
        const getType = localStorageService?.getTokenType();
        if (accessToken && getType === 'bearer') {
          config.headers = { 
            ...config.headers,  
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          };
        }
      } 
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
      return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);
const httpService = {
  get: http.get,
  post: http.post
};
export default httpService;