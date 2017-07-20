import { SET_INITIAL_MEAL_DATA, ADD_MEAL_ITEM, EDIT_MEAL_ITEM, DELETE_MEAL_ITEM, DELETE_MEAL, ADD_RECIPE_ITEM } from '../actions/constants'
import { refDates } from '../helpfulFiles/customItems'

export default function mealPlanning(state = [], action){
  switch(action.type){
    case SET_INITIAL_MEAL_DATA:
      return [...action.data]
    case ADD_MEAL_ITEM:
      let itemDate = typeof(action.date) === 'object' ? action.date : new Date(action.date)
      let itemTime = itemDate.getTime()
      let stringDate = (refDates(itemDate)).stringDate
      let mealOrder
      if(action.whichMeal === 'Dinner'){ mealOrder = 4}
      else if(action.whichMeal === 'Lunch'){ mealOrder = 2 }
      else if(action.whichMeal === 'Breakfast'){ mealOrder = 1 } 
      else { mealOrder = 3 }

      if(!(state.every(item => (action.text+action.whichMeal+itemTime) !== item.recipeName+item.mealTime+item.date))){
        return state
      } else if(action.text === '' || action.text === ' '){
        return state
      } else {
          return [
            {
              date: itemDate.getTime(),
              stringDate: stringDate,
              mealTime: action.whichMeal,
              mealOrder: mealOrder,
              isLinked: false,
              isFavorite: false,
              recipeName: action.text,
              recipeImage: '',
              recipeIngredients: [],
              recipeDirections: '',
              recipeLink: '',
              recipeApiId: null,
              readyInMinutes: null,
              notes: '',
              id: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
              key: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
            },
            ...state
          ]
      }//else

    case EDIT_MEAL_ITEM:
      if(action.text === '' || action.text === ' '){
        return state
      } else{
          return state.map(item => item.id === action.id ? {...item, recipeName: action.text } : item)
      }
    case DELETE_MEAL_ITEM:
      return state.filter(item => item.id !== action.id)
    case DELETE_MEAL:
      return state
    case ADD_RECIPE_ITEM:
      return state
    default:
      return state
  }//switch
}//mealPlanning