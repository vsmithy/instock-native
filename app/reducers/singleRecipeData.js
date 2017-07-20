import { SET_SINGLE_RECIPE_DATA } from '../actions/constants'

export default function singleRecipeData(state = [], action) {
  switch (action.type) {
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