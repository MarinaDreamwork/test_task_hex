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
    isLoggedIn: false
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
      state.isLoggedIn = true;
      state.isLoading = false;
    }, 
    loginRequestFailed: (state, action) => {

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

export const register = (payload) => async (dispatch) => {
  dispatch(signinRequest());
  try {
    const data = await registerService.register(payload);
    dispatch(signinRequestSuccess(data));
    console.log(data);
      history.push('/stats');
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

export const login = (payload) => async (dispatch) => {
  const { username, password} = payload;
  dispatch(loginRequest());
  try {
     const data = await loginService.login(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`);
    localStorageService.setToken(data);
    dispatch(loginRequestSuccess(data));
    console.log('data', data);
  } catch (error) {
    dispatch(loginRequestFailed(error))
  }
}


export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsername = () => (state) => state.users.entities?.username;
export const getRegisterError = () => (state) => state.users.error;

export default usersReducer;