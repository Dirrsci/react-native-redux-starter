/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/
import axios from 'axios'
import { apiBaseUrl, } from '../../constants/urls'

// CONSTANTS
export const FETCHING_COIN_DATA = 'FETCHING_COIN_DATA'
export const FETCHING_COIN_DATA_SUCCESS = 'FETCHING_COIN_DATA_SUCCESS'
export const FETCHING_COIN_DATA_FAIL = 'FETCHING_COIN_DATA_FAIL'

// Actions
export function FetchCoinData() {
  return async dispatch => {
    // notify the UI that we are fetching
    dispatch({ type: FETCHING_COIN_DATA, })
    try {
      let res = await axios.get(`${apiBaseUrl}/v1/ticker/?limit=10`)
      dispatch({
        type: FETCHING_COIN_DATA_SUCCESS,
        payload: res.data,
      })
    } catch (e) {
      dispatch({
        type: FETCHING_COIN_DATA_FAIL,
        payload: err.data,
      })
    }
  }
}

// Reducers
const ACTION_HANDLERS = {
  [FETCHING_COIN_DATA]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      data: null,
      hasError: false,
      errorMessage: null,
    }
  },
  [FETCHING_COIN_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      data: action.payload,
      hasError: false,
      errorMessage: null,
    }
  },
  [FETCHING_COIN_DATA_FAIL]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      data: action.payload,
      hasError: true,
      errorMessage: action.err,
    }
  },
}

// initial state
const initialState = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null,
}

// when an action gets dispatched callReducer will invoke the action handler that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
