import httpService from './http.service';

const loginEndPoint = 'login'

const loginService = {
  login: async (payload) => {
    const { username, password } = payload;
    const { data } = await httpService.post(loginEndPoint, `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`);
    return data;
  }
};

export default loginService;