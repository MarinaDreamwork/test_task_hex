import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
//import { getAccessToken, getTokenType } from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
      console.log('config', config);
      const url = config.url;
      if(url.includes('register') || url.includes('squeese')) {
        config.headers = {
            ...config.headers,
            'Accept': 'application/json',
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
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json',
          };
      }
    } 
        //const expiresDate = localStorageService.getTokenExpiresDate();
        //const refreshToken = localStorageService.getRefreshToken();
        //const isExpired = refreshToken && expiresDate < Date.now();

        //if (isExpired) {
          //const data = await authService.refresh();

          //localStorageService.setTokens(data);
        //}
        //   const accessToken = localStorageService?.getAccessToken();
        //   const getType = localStorageService?.getTokenType();
        //   if (accessToken && getType === 'bearer') {
        //         config.headers = { 
        //         ...config.headers,  
        //         Authorization: `Bearer ${accessToken}`,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //       };
        //  } else {
           
         //}
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// function transormData(data) {
//     return data && !data._id
//         ? Object.keys(data).map((key) => ({
//               ...data[key]
//           }))
//         : data;
// }
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