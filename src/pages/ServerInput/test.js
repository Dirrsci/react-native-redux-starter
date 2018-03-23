// mock redux store
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// mock endpoints
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
let axiosMock = new AxiosMock(axios)

import {
  // all action types
  SERVER_INPUT__SET_SERVER_IP,
  SERVER_INPUT__SET_INPUT_TEXT,
  SERVER_INPUT__SET_ERROR,
  // all actions
  setTextInputVal,
  setErrorMessage,
  setServerIp,
  saveServerIp,
  // all reducers
  REDUCERS,
  // helpers
  isValidIp
} from './modules'

let validIp = '192.168.1.1'
let invalidIp = '19216811'

// need to use 'function' instead of arrow function to allow access to 'this'
describe('ServerInput', () => {
  // reset axios mock routes after each test
  afterEach(() => {
    axiosMock.reset()
    axiosMock.restore()
  })

  it('creates SERVER_INPUT__SET_SERVER_IP when valid ip is given', async () => {
    const expectedActions = [
      { type: SERVER_INPUT__SET_SERVER_IP, payload: validIp },
    ]

    const store = mockStore({})
    await store.dispatch(saveServerIp(validIp))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should return false for invalid ip address', () => {
    let isValid = isValidIp(validIp)
    expect(isValid).toBeTruthy()
  })

  it('should return true for valid ip address', () => {
    let isValid = isValidIp(invalidIp)
    expect(isValid).toEqual(false)
  })

  //   // fetchMock creates a fake enpoint that will return data to our actions
  //   axiosMock
  //     .onGet('https://api.coinmarketcap.com/v1/ticker/?limit=10')
  //     .reply(200, [{ id: 'bitcoin', }])
})
