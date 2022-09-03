import { createAction, createSlice } from "@reduxjs/toolkit";
import linksService from "../services/links.service";

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    data: null,
    isLoading: true,
    error: null
  }, 
  reducers: {
    linksRequestSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    linksRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const linksRequest = createAction('links/request');

const {reducer: linksReducer, actions} = linksSlice;
const { linksRequestSuccess, linksRequestFailed} = actions;

export const getShortLink = ({ link }) => async (dispatch) => {
  console.log(link);
  dispatch(linksRequest());
  try {
    const data = await linksService.getSqueeze(link);
    dispatch(linksRequestSuccess(data));
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch(linksRequestFailed(error))
  }
};

export const getCreatedLink = () => (state) => state.links.data;

export default linksReducer;
