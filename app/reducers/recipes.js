import { SET_BREAKFAST_DATA,SET_LUNCH_DATA,SET_DINNER_DATA,SET_DESSERT_DATA,SET_INSTOCK_SEARCH_DATA,SET_QUERY_RECIPES_DATA } from '../actions/constants'

export default function recipes(state = [], action) {
  switch (action.type) {
    case SET_BREAKFAST_DATA:
      return [...action.recipes.data.recipes]
    case SET_LUNCH_DATA:
      return [...action.recipes.data.recipes]
    case SET_DINNER_DATA:
      return [...action.recipes.data.recipes]
    case SET_DESSERT_DATA:
      return [...action.recipes.data.recipes]
    case SET_QUERY_RECIPES_DATA:
      return [...action.recipes.data.results]
    case SET_INSTOCK_SEARCH_DATA:
      return [...action.recipes.data]
    default:
      return state
  }
}