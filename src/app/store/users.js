import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import loginService from "../services/login.service";
import registerService from '../services/register.service'; 
import history from "../utils/history";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    isLoggedIn: false,
    lastFetch: null
  },
  reducers: {
    signinRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    signinRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    loginRequestSuccess: (state, action) => {
      state.entities = action.payload.access_token;
      state.isLoggedIn = true;
      state.isLoading = false;
    }, 
    loginRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { 
  signinRequestSuccess,
  signinRequestFailed,
  loginRequestSuccess,
  loginRequestFailed
} = actions;

const signinRequest = createAction('users/signinRequest');
const loginRequest = createAction('users/loginRequest');

export const register = ({ payload, redirect }) => async (dispatch) => {
  dispatch(signinRequest());
  try {
    const data = await registerService.register(payload);
    dispatch(signinRequestSuccess(data));
    console.log(data);
      history.createHref('stats');
  } catch(error) {
    console.log(error);
    const status = error.response.status;
    const { detail } = error.response.data;
    if(status === 400) {
      dispatch(signinRequestFailed(detail));
    } else if(status === 422) {
      dispatch(signinRequestFailed(detail.msg));
    }  
  }
};

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { username, password } = payload;
  dispatch(loginRequest());
  try {
    const data = await loginService.login({ username, password });
    localStorageService.setToken({ data, username, password });
    dispatch(loginRequestSuccess(data));
    history.replace(redirect);
    console.log('data', data);
  } catch (error) {
    dispatch(loginRequestFailed(error.message))
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsername = () => (state) => state.users.entities?.username;
export const getRegisterError = () => (state) => state.users.error;

export default usersReducer;