import React, { Component, } from 'react'
import { View, StyleSheet, Text, } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Some layout</Text>
        <View>{this.props.children}</View>
      </View>
    )
  }
}
