import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, } from 'react-native'

import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import * as modules from './modules'
let mapDispatchToProps = { ...modules }
let reducer = modules.default

class Equipment extends Component {
  static navigationOptions = {
    title: 'Equipment',
  }

  render() {
    return (
      <View>
        <Text>THIS IS THE EQUIPMENT PAGE {this.props.serverIp}</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    equipment: state.equipment,
    serverIp: state.serverInput.serverIp
  }
}

// this function allows us to inject this page's reducer into the rootReducer as
// well as connect it to our redux store. composeComponent is used to add any
// additional wrappers the component may need. These are passed in the router
export default function(store) {
  injectReducer(store, { key: 'equipment', reducer, })
  // we return a function that our router can call with an array of component wrappers
  let connectFunc = connect(mapStateToProps, mapDispatchToProps)
  return composeComponent(connectFunc, Equipment)
}
