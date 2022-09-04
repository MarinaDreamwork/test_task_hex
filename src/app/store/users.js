import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import loginService from '../services/login.service';
import registerService from '../services/register.service'; 
import { generateError } from '../utils/generateErrors';
import history from '../utils/history';

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
    history.push(redirect);
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
  console.log(payload);
  dispatch(loginRequest());
  try {
    const data = await loginService.login(payload);
    localStorageService.setToken(data);
    dispatch(loginRequestSuccess(data));
    history.push(redirect);
  } catch (error) {
    console.log('error', error);
    const { code, message } = error;
    if(code === 'ERR_NETWORK') {
      const messageError = generateError(message);
      dispatch(loginRequestFailed(messageError));
    }
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsername = () => (state) => state.users.entities?.username;
export const getLoginError = () => (state) => state.users.error; 

export default usersReducer;