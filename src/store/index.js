import { Platform, } from 'react-native'
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import devTools from 'remote-redux-devtools'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import makeRootReducer from './reducers'

/*
thunk - allows for async actions (making networking requests)
promise - async actions return promises
logger - logs: pre state, current action, post state
*/
// const middleware = applyMiddleware(thunk, promise, logger)
const middleware = applyMiddleware(thunk, promise)

// This adds all of our reducers from each of our pagess
// to the store to get handled by our actions
const Store = createStore(
  makeRootReducer(),
  compose(
    middleware,
    // devtools allow for remote debugging
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678,
    })
  )
)

Store.asyncReducers = {}

export default Store
