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
      // console.log('gonna update the chosen date to: ' + action.chosenDate)
      return {
        mealFilter: action.mealFilter,
        chosenDate: action.chosenDate,
        chosenRecipeSearch: state.chosenRecipeSearch,
        newSearchBreakfast: state.newSearchBreakfast,
        newSearchLunch: state.newSearchLunch,
        newSearchDinner: state.newSearchDinner,
        newSearchDessert: state.newSearchDessert,
      }
    case UPDATE_RECIPE_SEARCH:
      return {
        mealFilter: state.mealFilter,
        chosenDate: state.chosenDate,
        chosenRecipeSearch: action.whichSearch,
        newSearchBreakfast: state.newSearchBreakfast,
        newSearchLunch: state.newSearchLunch,
        newSearchDinner: state.newSearchDinner,
        newSearchDessert: state.newSearchDessert,
      }
    case UPDATE_SEARCHED_FLAG:
      return {
        mealFilter: state.mealFilter,
        chosenDate: state.chosenDate,
        chosenRecipeSearch: state.chosenRecipeSearch,
        newSearchBreakfast: action.newSearchBreakfast,
        newSearchLunch: action.newSearchLunch,
        newSearchDinner: action.newSearchDinner,
        newSearchDessert: action.newSearchDessert,
      }
    default:
      return state
  }//switch
}//persistedSettings

