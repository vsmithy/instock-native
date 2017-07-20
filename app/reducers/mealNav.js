import { NavigationActions } from 'react-navigation'
import { MealStack } from '../containers/MealNavigation'

const firstAction = MealStack.router.getActionForPathAndParams('Home')
const initialNavState = MealStack.router.getStateForAction(firstAction)

export default function nav(state = initialNavState, action){
  let nextState
  switch(action.type){
    case 'Home':
      nextState = MealStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state)
      break
    case 'Meal':
      nextState = MealStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Meal' }), state)
      break
    case 'Item':
      nextState = MealStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Item' }), state)
      break
    default:
      nextState = MealStack.router.getStateForAction(action, state)
      break
  }//switch

  return nextState || state
}//nav