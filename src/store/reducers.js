import { combineReducers, } from 'redux'
/* import any global reducers here */

/*
injectReducer - used by page routes to inject their reducers into the store.asyncReducers.
store.asyncReducers is then later used by "makeRootReducer" to add each page reducer to any
global reducers you might need
*/
export const injectReducer = (store, { key, reducer, }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

/*
makeRootReducer combines all individual page reducers as well as any global reducers
are returns them to the store. The store uses these combined reducers to create the RootReducer
*/
export const makeRootReducer = (asyncReducers) => {
  // TODO: when global reducers are added (like auth) we can get rid of this fake initialization
  if (!asyncReducers) {
    asyncReducers = {
      test1: (state = 0, action) => state,
    }
  }
  return combineReducers({
    ...asyncReducers,
  })
}

export default makeRootReducer
