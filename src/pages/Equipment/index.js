import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, } from 'react-native'

import Store from '../../store'
import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import reducer, { actions, } from './modules'

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

const pageKey = 'Equipment'
const mapDispatchToProps = { ...actions }
function mapStateToProps(state) {
  return {
    Equipment: state[Equipment],
    serverIp: state.ServerInput.serverIp
  }
}
injectReducer(Store, { key: pageKey, reducer, })
Equipment = connect(mapStateToProps, mapDispatchToProps)(Equipment)
export default composeComponent(Equipment)
