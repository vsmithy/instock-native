import { ADD_FAV, REMOVE_FAV, SET_INITIAL_FAV_DATA } from '../actions/constants'

export default function favData(state = [], action) {
  switch (action.type) {
    case SET_INITIAL_FAV_DATA:
      return [...action.data]
    case ADD_FAV:
      return [
        {
          id: action.id,
          title: action.title,
          image: action.image,
          readyInMinutes: action.readyInMinutes,
          extendedIngredients: action.extendedIngredients,
          analyzedInstructions: action.analyzedInstructions,
        },
        ...state
      ]
    case REMOVE_FAV:
      return state.filter((item) => item.id !== action.id)
    default:
      return state
  }
}
