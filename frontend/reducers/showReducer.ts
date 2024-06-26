// reducers/shoeReducer.js

import {
    FETCH_SHOES_REQUEST,
    FETCH_SHOES_SUCCESS,
    FETCH_SHOES_FAILURE,
    FETCH_SHOES,
  } from '../actions/shoeActions';
  
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  
  const shoeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SHOES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SHOES:
        return {
          ...state,
          loading: false,
          tasks: [...state.tasks, ...action.payload],
        };
      case FETCH_SHOES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
          return state;
    }
  };
  
  export default shoeReducer;
  