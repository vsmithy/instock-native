import { SET_DESSERT_DATA } from '../actions/constants'

export default function dessertData(state = [], action) {
  switch (action.type) {
    case SET_DESSERT_DATA:
      return [...action.recipes.data.recipes]
    default:
      return state
  }
}