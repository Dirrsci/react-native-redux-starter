import React, { Component, } from 'react'
import { View, StyleSheet, Text, } from 'react-native'

export default class Test extends Component {
  render() {
    console.log('##rendering test compon')
    return (
      <View>
        <Text>Some text here</Text>
      </View>
    )
  }
}
