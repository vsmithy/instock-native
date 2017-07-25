import { UPDATE_DATE_MEAL, UPDATE_RECIPE_SEARCH, UPDATE_SEARCHED_FLAG } from '../actions/constants'

const initialDate = new Date()
const initialState = {
  mealFilter: 'Breakfast', 
  chosenDate: initialDate, 
  chosenRecipeSearch: 'breakfastData',
  newSearchBreakfast: true,
  newSearchLunch: true,
  newSearchDinner: true,
  newSearchDessert: true,
}

export default function persistedSettings(state = initialState, action){
  switch(action.type){
    case UPDATE_DATE_MEAL:
      console.log('gonna update the chosen date to: ' + action.chosenDate)
      return {
        mealFilter: action.mealFilter,
        chosenDate: action.chosenDate,
        chosenRecipeSearch: action.whichSearch,
        newSearchBreakfast: action.newSearchBreakfast,
        newSearchLunch: action.newSearchLunch,
        newSearchDinner: action.newSearchDinner,
        newSearchDessert: action.newSearchDessert,
      }
    case UPDATE_RECIPE_SEARCH:
      return {
        mealFilter: action.mealFilter,
        chosenDate: action.chosenDate,
        chosenRecipeSearch: action.whichSearch,
        newSearchBreakfast: action.newSearchBreakfast,
        newSearchLunch: action.newSearchLunch,
        newSearchDinner: action.newSearchDinner,
        newSearchDessert: action.newSearchDessert,
      }
    case UPDATE_SEARCHED_FLAG:
      return {
        mealFilter: action.mealFilter,
        chosenDate: action.chosenDate,
        chosenRecipeSearch: action.whichSearch,
        newSearchBreakfast: action.newSearchBreakfast,
        newSearchLunch: action.newSearchLunch,
        newSearchDinner: action.newSearchDinner,
        newSearchDessert: action.newSearchDessert,
      }
    default:
      return state
  }//switch
}//persistedSettings

