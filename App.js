/*
App.js is the main file the application is ran from. It is responsible for setting
up any top level wrappers are needed by the entire app (e.x. <Provider> is used to
provide the Redux store)
*/

import React, { Component, } from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import { Provider, } from 'react-redux'

import Store from './src/store'
import Pages from './src/pages'

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Pages />
      </Provider>
    )
  }
}

export default App
