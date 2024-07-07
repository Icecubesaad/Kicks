// actions/shoesActions.js

export const FETCH_SHOES_REQUEST = 'FETCH_SHOES_REQUEST';
export const FETCH_SHOES_SUCCESS = 'FETCH_SHOES_SUCCESS';
export const FETCH_SHOES_FAILURE = 'FETCH_SHOES_FAILURE';
export const FETCH_SHOES = 'FETCH_SHOES';

export const fetchShoesRequest = () => ({
  type: FETCH_SHOES_REQUEST,
});

export const fetchShoesSuccess = shoes => ({
  type: FETCH_SHOES,
  payload: shoes,
});

export const fetchShoesFailure = error => ({
  type: FETCH_SHOES_FAILURE,
  payload: error,
});

export const fetchShoesByCompany = company => {
    return async dispatch => {
      dispatch(fetchShoesRequest());
      try {
        const response = await fetch(`http://192.168.0.106:5000/api/get/getShoesByCompany/${company}`, {
          method: 'GET',
        });
        const data = await response.json();
        dispatch(fetchShoesSuccess(data));
      } catch (error) {
        dispatch(fetchShoesFailure(error.toString()));
      }
    };
  };
  
