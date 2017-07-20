import { SET_BREAKFAST_DATA } from '../actions/constants'

export default function breakfastData(state = [], action) {
  switch (action.type) {
    case SET_BREAKFAST_DATA:
      return [...action.recipes.data.recipes]
    default:
      return state
  }
}