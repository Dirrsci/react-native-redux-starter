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
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  // all actions
  FetchCoinData,
  // all reducers
  REDUCERS
} from './modules'

describe('ServerInput', () => {
  // reset axios mock routes after each test
  afterEach(() => {
    axiosMock.reset()
    axiosMock.restore()
  })

  it('creates FETCHING_COIN_DATA_SUCCESS when fetching coindata has been done', async() => {
    // fetchMock creates a fake enpoint that will return data to our actions
    axiosMock
      .onGet('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .reply(200, [{ id: 'bitcoin', }])

    const expectedActions = [
      { type: FETCHING_COIN_DATA },
      {
        type: FETCHING_COIN_DATA_SUCCESS,
        payload: [{ id: 'bitcoin', }]
      },
    ]
    const store = mockStore({})
    await store.dispatch(FetchCoinData())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
