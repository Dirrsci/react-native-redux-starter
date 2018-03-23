import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import * as modules from './modules'
let mapDispatchToProps = { ...modules }
let reducer = modules.default

import styles from './styles'

class ServerInput extends Component {
  static navigationOptions = {
    title: 'Enter IP Address',
  }

  goToNextPage() {
    // we use resetAction to empty the navigation stack prevent 'back' button from appearing
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Equipment' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  // set Redux state if an ip address has already been saved to memory
  async componentDidMount() {
    let storedSterverIp = await AsyncStorage.getItem('@Storage:serverIp')
    this.props.saveServerIp(storedSterverIp)
    this.props.setIsLoading(false)
    // if (!this.props.serverInput.hasError) this.goToNextPage()
  }

  async onSave() {
    let { inputText } = this.props.serverInput
    this.props.saveServerIp(inputText)
    this.goToNextPage()
  }

  render() {
    let { serverIp, inputText, hasError, errorMessage, isLoading } = this.props.serverInput
    if (isLoading) return null
    return (
      <View style={styles.container}>
        <Text>{ this.props.serverInput.serverIp }</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Server IP'
          onChangeText={this.props.setTextInputVal}
        />
        <Button
          onPress={this.onSave.bind(this)}
          title='Save'
          color='#841584'
          accessibilityLabel='Save Server IP Address'
        />
        <Text style={styles.error}>{ hasError && errorMessage }</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    serverInput: state.serverInput,
  }
}

// this function allows us to inject this page's reducer into the rootReducer as
// well as connect it to our redux store. composeComponent is used to add any
// additional wrappers the component may need. These are passed in the router
export default function(store) {
  injectReducer(store, { key: 'serverInput', reducer, })
  // we return a function that our router can call with an array of component wrappers
  let connectFunc = connect(mapStateToProps, mapDispatchToProps)
  return composeComponent(connectFunc, ServerInput)
}
