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

each Top level "page" uses react-navigation, so see their docs if you need to make
any navigation changes
*/
const Router = StackNavigator({
  ServerInput: {
    // TODO: need to find a way to handle the nativation header
    screen: ServerInput([ ])
  },
  Equipment: {
    screen: Equipment([ requireIp ])
  }
}, {
  initialRouteName: 'ServerInput',
})

export default Router
