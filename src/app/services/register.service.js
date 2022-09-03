import httpService from './http.service';

const registerService = {
  register: async ({ username, password }) => {
    const { data } = await httpService.post(`register?username=${username}&password=${password}`);
    return data;
  }
};

export default registerService;