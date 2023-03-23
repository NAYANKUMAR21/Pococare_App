import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_SUCCESS,
} from './auth.type';
let API = 'http://localhost:8080';
export const registerUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/auth/signup`, creds);
    const data = await res.data;

    return dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: AUTH_ERROR });
  }
};

export const loginUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/auth/login`, creds);
    const data = await res.data;

    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    return dispatch({ type: AUTH_ERROR });
  }
};
export const refreshToken = () => async (state, dispatch) => {
  try {
    dispatch({ type: REFRESH_TOKEN_LOADING });
    const refresh_Token = await axios.get(`${API}/auth/refreshToken`, {
      headers: {
        authorization: localStorage.getItem('refreshToken'),
      },
    });

    localStorage.setItem('token', refresh_Token.data.token);
    return dispatch({ type: REFRESH_TOKEN_SUCCESS });
  } catch (er) {
    return dispatch({ type: REFRESH_TOKEN_ERROR });
  }
};
