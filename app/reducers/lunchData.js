import { SET_LUNCH_DATA } from '../actions/constants'

export default function lunchData(state = [], action) {
  switch (action.type) {
    case SET_LUNCH_DATA:
      return [...action.recipes.data.recipes]
    default:
      return state
  }
}