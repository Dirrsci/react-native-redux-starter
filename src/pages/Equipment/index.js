import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Store from '../../store'
import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import reducer, { actions, } from './modules'

class Equipment extends Component {
  static navigationOptions = {
    title: 'Equipment',
  }

  goToServerInputPage() {
    // we use resetAction to empty the navigation stack prevent 'back' button from appearing
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ServerInput' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  async componentDidMount() {
    let storedSterverIp = await AsyncStorage.getItem('@Storage:serverIp')
    this.props.saveServerIp(storedSterverIp)
    this.props.setIsLoading(false)
    if (!this.props.Equipment.hasError) this.goToServerInputPage()
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
    Equipment: state[pageKey],
    serverIp: state.ServerInput.serverIp
  }
}
injectReducer(Store, { key: pageKey, reducer, })
Equipment = connect(mapStateToProps, mapDispatchToProps)(Equipment)
export default composeComponent(Equipment)
