import httpService from './http.service';

const linksService = {
  getSqueeze: async (payload) => {
    const { data } = await httpService.post(`squeeze?link=${payload}`);
    return data;
  }
};

export default linksService;