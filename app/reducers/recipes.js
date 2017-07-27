import { SET_BREAKFAST_DATA,SET_LUNCH_DATA,SET_DINNER_DATA,SET_DESSERT_DATA,SET_INSTOCK_SEARCH_DATA,SET_QUERY_RECIPES_DATA,SET_SINGLE_RECIPE_DATA } from '../actions/constants'

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
    case SET_SINGLE_RECIPE_DATA:
      return [{
        "id":action.recipes.data.id,
		    "title":action.recipes.data.title,
		    "readyInMinutes":action.recipes.data.readyInMinutes,
		    "image":action.recipes.data.image,
		    "extendedIngredients":action.recipes.data.extendedIngredients,
        "analyzedInstructions":action.recipes.data.analyzedInstructions
      }]
    default:
      return state
  }
}