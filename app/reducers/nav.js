import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../containers/AppContainer'

const firstAction = AppNavigator.router.getActionForPathAndParams('Inventory')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

export default function nav(state = initialNavState, action){
  const nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}//nav