import axios from 'axios';

import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_SINGLE,
} from './product.type';
let API = 'http://localhost:8080';
export const getProducts = () => async (dispatch, state) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const res = await axios.get(`${API}/product`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });

    return dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
  } catch (er) {
    localStorage.setItem('errorToken', true);
    return dispatch({ type: GET_PRODUCT_ERROR });
  }
};
export const getSingleProduct = (id) => async (dispatch, state) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const getAll = await axios.get(`${API}/product/${id}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });

    return dispatch({ type: GET_SINGLE, payload: getAll.data });
  } catch (er) {
    return dispatch({ type: GET_PRODUCT_ERROR });
  }
};
