import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default function requiresIp(Component) {

  class RequireIP extends React.Component {
    componentDidMount() {
      if (!this.props.serverIp) {
        // we use resetAction to clear the navigation stack prevent 'back' button from appearing
        let resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ServerInput' })]
        })
        this.props.navigation.dispatch(resetAction)
      }
    }
    render() {
      return (
        <View>{ this.props.serverIp ? <Component {...this.props} /> : null }</View>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      serverIp: state.serverInput.serverIp
    }
  }

  return connect(mapStateToProps)(RequireIP)
}
