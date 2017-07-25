import { SET_QUERY_RECIPES_DATA } from '../actions/constants'

export default function querySearchRecipesData(state = [], action) {
  switch (action.type) {
    case SET_QUERY_RECIPES_DATA:
      return [...action.recipes.data.results]
    default:
      return state
  }
}