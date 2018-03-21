import { injectReducer, } from '../../store/reducers'
import reducer from './modules'

import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, } from 'react-native'

import { FetchCoinData, fetchingCoinData } from './modules'

let blue = 'blue'
const styles = StyleSheet.create({
  headerContainer: {
    // display: 'flex',
    // backgroundColor: blue,
    // flex: 1,
    // width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
})

class CryptoContainer extends Component {
  static navigationOptions = {
    title: 'testing',
  }

  componentDidMount() {
    this.props.FetchCoinData()
  }

  render() {
    return (
      <View>
        <Text>Container</Text>
        <Text>{JSON.stringify(this.props.crypto)}</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    crypto: state.crypto,
  }
}

export default function(store) {
  injectReducer(store, { key: 'crypto', reducer, })
  return connect(mapStateToProps, { FetchCoinData, fetchingCoinData })(CryptoContainer)
}
