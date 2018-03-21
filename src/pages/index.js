import { StackNavigator, } from 'react-navigation'
import Store from '../store'

import ServerInput from './ServerInput'

const Router = StackNavigator({
  Home: {
    screen: ServerInput(Store),
  },
}, {
  initialRouteName: 'Home',
})

export default Router
