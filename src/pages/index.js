import React, { Component, } from 'react'
import { StackNavigator, } from 'react-navigation'
import Store from '../store'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import ServerInput from './ServerInput'
import Equipment from './Equipment'

import requireIp from '../utils/requireIP'

/*
Every route that needs access to Redux must be passed the "Store" to connect to
You can then call the
*/

function NavWrapper(Comp, title) {
  class PageWrapper extends React.Component {
    static navigationOptions = { title, }
    render() {
      return <Comp />
    }
  }
  return PageWrapper
}

const Router = StackNavigator({
  ServerInput: {
    screen: NavWrapper(ServerInput(Store)([]), 'title')
    // screen: function() {
    //   this.title = 'something'
    //   let ServerInputComp = ServerInput(Store)([])
    //   return (
    //     <ServerInputComp />
    //   )
    // }
  },
  // Equipment: {
  //   screen: Equipment(Store)([ ])
  // }
}, {
  initialRouteName: 'ServerInput',
})

export default Router
