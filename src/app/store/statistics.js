import { createAction, createSlice } from '@reduxjs/toolkit';
import statisticService from '../services/statistic.service';

const statisticSlice = createSlice({
  name: 'statistics',
  initialState: {
    data: null,
    isLoading: true,
    error: null,
    allLength: null,
    allData: null
  }, 
  reducers: {
    statisticRequestSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    statisticRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    statisticALLRequestSuccess: (state, action) => {
      state.allLength = action.payload.length;
      state.allData = action.payload;
      state.isLoading = false;
    },
    statisticALLRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const statisticRequest = createAction('statistics/request');
const statisticAllRequest = createAction('statistics/allRequest');

const { reducer: statisticsReducer, actions } = statisticSlice;
const { 
  statisticRequestSuccess,
  statisticRequestFailed,
  statisticALLRequestSuccess,
  statisticALLRequestFailed
} = actions;

export const loadStatisticData = (payload) => async (dispatch) => {
  dispatch(statisticRequest());
  try {
    const data = await statisticService.getStatistic(payload);
    dispatch(statisticRequestSuccess(data));
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch(statisticRequestFailed(error))
  }
};

export const loadAllStatisticInformation = () => async (dispatch) => {
  dispatch(statisticAllRequest());
  try {
    const data = await statisticService.getAllStatistic();
    dispatch(statisticALLRequestSuccess(data))
  } catch (error) {
    dispatch(statisticALLRequestFailed(error.message));
  }
};

export const getCurrentStatiscticData = () => (state) => state.statistics.data;
export const getAllStatLength = () => (state) => state.statistics.allLength;
export const getAllStat = () => (state) => state.statistics.allData;
export const getLoadingStatistic = () => (state) => state.statistics.isLoading;

export default statisticsReducer;
