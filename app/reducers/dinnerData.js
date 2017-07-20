import { SET_DINNER_DATA } from '../actions/constants'

export default function dinnerData(state = [], action) {
  switch (action.type) {
    case SET_DINNER_DATA:
      return [...action.recipes.data.recipes]
    default:
      return state
  }
}