import httpService from './http.service';

const statisticEndPoint = 'statistics';

const statisticService = {
  getStatistic: async (payload) => {
    const { data } = await httpService.get(`${statisticEndPoint}?${payload}`);
    return data;
  },
   getAllStatistic: async () => {
    const { data } = await httpService.get(statisticEndPoint);
    console.log('data', data);
    return data; 
   }
};

export default statisticService;