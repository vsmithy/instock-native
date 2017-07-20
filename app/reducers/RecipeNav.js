import { NavigationActions } from 'react-navigation'
import { RecipeStack } from '../containers/RecipesContainer'

const firstAction = RecipeStack.router.getActionForPathAndParams('Home')
const initialNavState = RecipeStack.router.getStateForAction(firstAction)

export default function nav(state = initialNavState, action){
  let nextState
  switch(action.type){
    case 'Home':
      nextState = RecipeStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state)
      break
    case 'Results':
      nextState = RecipeStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Results' }), state)
      break
    case 'Details':
      nextState = RecipeStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Details' }), state)
      break
    default:
      nextState = RecipeStack.router.getStateForAction(action, state)
      break
  }//switch

  return nextState || state
}//nav