import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import Store from '../../store'
import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// import our reducers and actions to 'connect' them with redux
import reducer, { actions } from './modules'

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
    // if (!this.props.ServerInput.hasError) this.goToNextPage()
  }

  async onSave() {
    let { inputText } = this.props.ServerInput
    this.props.saveServerIp(inputText)
    // this.goToNextPage()
  }

  render() {
    let { serverIp, inputText, hasError, errorMessage, isLoading } = this.props.ServerInput
    if (isLoading) return null
    return (
      <View style={styles.container}>
        <Text>{ this.props.ServerInput.serverIp }</Text>
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
// pageKey defines the namespace with which this components redux values will be stored under
const pageKey = 'ServerInput'
// mapDispatchToProps is an object with all actions we want to be available through redux
const mapDispatchToProps = { ...actions }
// mapStateToProps retreives any state variables (from any page) that we might need
function mapStateToProps(state) {
  return {
    ServerInput: state[pageKey],
  }
}
// injectReducer injects this page's reducers into the global reducer
injectReducer(Store, { key: pageKey, reducer, })
// calling 'connect' glues this component to redux with the given mappings
ServerInput = connect(mapStateToProps, mapDispatchToProps)(ServerInput)
// composeComponent will add any higher order components that we specify in the router
export default composeComponent(ServerInput)
