// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { View, Text, StyleSheet } from 'react-native'
//
// import FetchCoinData from '../Actions/FetchCoinData'
//
// let blue = 'blue'
// const styles = StyleSheet.create({
//   headerContainer: {
//     display: 'flex',
//     backgroundColor: blue,
//     alignItems: 'flex-start',
//     flex: 1,
//     width: '100%',
//   },
//   header: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
// })
//
// class CryptoContainer extends Component {
//   componentDidMount() {
//     this.props.FetchCoinData()
//   }
//   render() {
//     let { data, errorMessage, hasError, isFetching } = this.props.crypto
//     return (
//       <View style={styles.headerContainer}>
//         <Text>Container</Text>
//         <Text>{JSON.stringify(this.props.crypto)}</Text>
//       </View>
//     )
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     crypto: state.crypto
//   }
// }
//
// export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
