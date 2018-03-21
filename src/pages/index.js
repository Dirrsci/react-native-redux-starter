import { StackNavigator, } from 'react-navigation'
import Store from '../store'

import ServerInput from './ServerInput'

// all page compoents defined in "StackNavigator" will have access to this.props.navigation
const Router = StackNavigator({
  Home: {
    screen: ServerInput(Store),
  },
}, {
  initialRouteName: 'Home',
})

export default Router
