/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/
import axios from 'axios'
import { apiBaseUrl, } from '../../constants/urls'
import { AsyncStorage } from 'react-native'

// Action types (these are global and shoudln't be reused from other pages)
export const EQUIPMENT__ = 'EQUIPMENT__'

// Plain Actions

// Thunk Actions
// NOTE: do NOT use inline actions, ALWAYS call a plain action to dispatch
export function saveServerIp(ip) {
  return async dispatch => {
    if (!isValidIp(ip)) return dispatch(setErrorMessage(`Invalid Ip Address ${ip}`))

    try {
      await AsyncStorage.setItem('@Storage:serverIp', ip)
      dispatch(setServerIp(ip))
    } catch (e) {
      dispatch(setErrorMessage(`Invalid Ip Address ${ip}`))
    }
  }
}

// Reducers
export const REDUCERS = {
  // [SERVER_INPUT__SET_ERROR]: (state, action) => {
  //   return {
  //     ...state,
  //     hasError: true,
  //     errorMessage: action.payload,
  //   }
  // },
}

// initial state
const initialState = {
  serverIp: null,
  inputText: '',
  hasError: false,
  errorMessage: null,
}

// when an action gets dispatched callReducer will invoke the reducer that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = REDUCERS[action.type]
  return handler ? handler(state, action) : state
}
