/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/
import axios from 'axios'
import { apiBaseUrl, } from '../../constants/urls'
import { AsyncStorage } from 'react-native'

// Action types (these are global and shoudln't be reused from other pages)
export const SERVER_INPUT__SET_SERVER_IP = 'SERVER_INPUT__SET_SERVER_IP'
export const SERVER_INPUT__SET_INPUT_TEXT = 'SERVER_INPUT__SET_INPUT_TEXT'
export const SERVER_INPUT__SET_ERROR = 'SERVER_INPUT__SET_ERROR'
export const SERVER_INPUT__SET_IS_LOADING  = 'SERVER_INPUT__SET_IS_LOADING'

// Plain Actions
export function setTextInputVal(text) {
  return { type: SERVER_INPUT__SET_INPUT_TEXT, payload: text }
}

export function setErrorMessage(err) {
  return { type: SERVER_INPUT__SET_ERROR, payload: err }
}

export function setServerIp(ip) {
  return { type: SERVER_INPUT__SET_SERVER_IP, payload: ip }
}

export function setIsLoading(isLoading) {
  return { type: SERVER_INPUT__SET_IS_LOADING, payload: isLoading }
}

export function isValidIp(ip) {
  if (!ip) return false
  let hasMatch = ip.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm)
  return !!hasMatch
}

// Thunk Actions
// NOTE: do NOT use inline actions, ALWAYS call a plain action to dispatch
export function saveServerIp(ip) {
  return async dispatch => {
    let errorMessage = `Invalid Ip Address ${ip}`
    if (!isValidIp(ip)) return dispatch(setErrorMessage(errorMessage))
    try {
      await AsyncStorage.setItem('@Storage:serverIp', ip)
      dispatch(setServerIp(ip))
    } catch (e) {
      dispatch(setErrorMessage(errorMessage))
    }
  }
}

// Reducers
export const REDUCERS = {
  [SERVER_INPUT__SET_INPUT_TEXT]: (state, action) => {
    return {
      ...state,
      inputText: action.payload,
      hasError: false,
      errorMessage: null,
    }
  },
  [SERVER_INPUT__SET_SERVER_IP]: (state, action) => {
    return {
      ...state,
      serverIp: action.payload,
      // inputText: '',
      hasError: false,
      errorMessage: null,
    }
  },
  [SERVER_INPUT__SET_IS_LOADING]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload
    }
  },
  [SERVER_INPUT__SET_ERROR]: (state, action) => {
    return {
      ...state,
      hasError: true,
      errorMessage: action.payload,
    }
  },
}

// initial state
const initialState = {
  serverIp: null,
  inputText: '',
  hasError: false,
  errorMessage: null,
  isLoading: true, // first action is to load ip from memory, so we can assume this from the start
}

// when an action gets dispatched callReducer will invoke the reducer that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = REDUCERS[action.type]
  return handler ? handler(state, action) : state
}
