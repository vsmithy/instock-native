import { GET_RECIPES, SET_SEARCHED_RECIPES } from '../actions/constants'

export default function recipes(state = [], action) {
  switch (action.type) {
    case SET_SEARCHED_RECIPES:
      return [...action.recipes.data.recipes]
    default:
      return state
  }
}