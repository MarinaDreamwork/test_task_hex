import httpService from './http.service';

const loginEndPoint = 'login'

const loginService = {
  login: async (payload) => {
    const { data } = await httpService.post(loginEndPoint, payload);
    return data;
  }
};

export default loginService;