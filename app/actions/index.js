import * as types from './constants'
import axios from 'axios'

//inventory
export const addInvItem = (name, amount) => ({ type: types.ADD_INV_ITEM, name, amount })
export const editInvItem = (id, name, amount) => ({ type: types.EDIT_INV_ITEM, id, name, amount })
export const checkForDelete = (id) => ({ type: types.CHECK_FOR_DELETE, id })
export const deleteInvGroup = () => ({ type: types.DELETE_INV_GROUP })
export const sendToShopping = (id) => ({  type: types.SEND_TO_SHOPPING_LIST, id })
export const sortInvName = () => ({ type: types.SORT_INV_BY_NAME })
export const sortInvAmount = () => ({ type: types.SORT_INV_BY_AMOUNT })
export const replenish = (items) => ({ type: types.REPLENISH, items })
export const setInitialData = (data) => ({ type: types.SET_INITIAL_DATA, data })

//shopping
export const addShopItem = (text) => ({ type: types.ADD_SHOP_ITEM, text })
export const editShopItem = (id, text) => ({ type: types.EDIT_SHOP_ITEM, id, text })
export const checkForShopDelete = (id) => ({ type: types.CHECK_FOR_SHOP_DELETE, id})
export const deleteShopItem = () => ({ type: types.DELETE_SHOP_ITEM })
export const markCompleted = (id) => ({ type: types.MARK_COMPLETED, id })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setInitialShoppingData = (data) => ({ type: types.SET_INITIAL_SHOPPING_DATA, data })

//mealplanning 
export const setInitialMealData = (data) => ({ type: types.SET_INITIAL_MEAL_DATA, data })
export const addMealItem = (text, date, whichMeal) => ({ type: types.ADD_MEAL_ITEM, text,  date,whichMeal})
export const editMealItem = (text, id) => ({ type: types.EDIT_MEAL_ITEM, text, id})
export const deleteMealItem = (id) => ({ type: types.DELETE_MEAL_ITEM, id})
export const deleteMeal = (mealDate, mealType) => ({ type: types.DELETE_MEAL, mealDate, mealType})
export const addRecipeItem = (recipe) => ({ type: types.ADD_RECIPE_ITEM, recipe})
export const updateDateMeal = (mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert) => ({ type: types.UPDATE_DATE_MEAL, mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert }) 



//recipes
export const setInitialFavData = (data) => ({ type: types.SET_INITIAL_FAV_DATA, data })
export const setSearchedRecipes = ({ recipes }) => ({ type: types.SET_SEARCHED_RECIPES, recipes })
export const setBreakfastData = ({ recipes }) => ({ type: types.SET_BREAKFAST_DATA, recipes})
export const setLunchData = ({ recipes }) => ({ type: types.SET_LUNCH_DATA, recipes})
export const setDinnerData = ({ recipes }) => ({ type: types.SET_DINNER_DATA, recipes})
export const setDessertData = ({ recipes }) => ({ type: types.SET_DESSERT_DATA, recipes})
export const setInstockSearchData = ({ recipes }) => ({ type: types.SET_INSTOCK_SEARCH_DATA, recipes})
export const setQuerySearchRecipesData = ({ recipes }) => ({ type: types.SET_QUERY_RECIPES_DATA, recipes})
export const setSingleRecipeData = ({ recipes }) => ({ type: types.SET_SINGLE_RECIPE_DATA, recipes})
export const addFav = (id, title, image, readyInMinutes, extendedIngredients, analyzedInstructions) => ({ type: types.ADD_FAV, id, title, image, readyInMinutes, extendedIngredients, analyzedInstructions })  
export const removeFav = (id) => ({ type: types.REMOVE_FAV, id })
export const updateRecipeSearch = (mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert) => ({ type: types.UPDATE_RECIPE_SEARCH, mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert})
export const updateSearchedFlag = (mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert) => ({ type: types.UPDATE_SEARCHED_FLAG, mealFilter, chosenDate, whichSearch, newSearchBreakfast, newSearchLunch, newSearchDinner, newSearchDessert})
export const updateDetailRecipe = (id, title, readyInMinutes, image, extendedIngredients, analyzedInstructions) => ({ type: types.UPDATE_DETAIL_RECIPE,id, title, readyInMinutes, image, extendedIngredients, analyzedInstructions })

let instance = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes',
  timeout: 10000,
  headers: {
    'X-Mashape-Authorization': 'yourStuffGoesHere...',   //dev
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'dataType': 'json',
  }
})


export function getRecipes(category) {
  const getRandomRecipes = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=40&tags=" + category
  return (dispatch, getState) => {
    return instance.get(getRandomRecipes)
    .then(resp => {
      if(category === 'breakfast'){
        dispatch(setBreakfastData({recipes: resp}))
      } else if(category === 'lunch'){
        dispatch(setLunchData({recipes: resp}))
      } else if(category === 'dinner'){
        dispatch(setDinnerData({recipes: resp}))
      } else {
        dispatch(setDessertData({recipes: resp}))
      }
    })
    .catch( (ex) => {
      console.log(ex)
    })
  }//return
}//fetchRecipes


export function getRecipesByIngredient(ingredientList) {
  const stringList = ingredientList.map(item => item.toLowerCase()).toString().replace(/,/g,"%2C").replace(/ /g, "+")
  const fetchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + stringList + "&limitLicense=false&number=50&ranking=2"

  return (dispatch, getState) => {
    return instance.get(fetchURL)
    .then(resp => { dispatch(setInstockSearchData({recipes: resp})) })
    .catch( (ex) => {
      console.log(ex)
    })
  }//return
}//getRecipesByIngredient

export function querySearchRecipes(queryString) {
  const stringList = queryString.toLowerCase().replace(/,/g,"%2C").replace(/ /g, "+")
  const fetchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true&limitLicense=false&number=25&offset=0&query=" + stringList
  if(queryString === '' || queryString === ' '){
    console.log('mr reducer says no')
  } else {
    return (dispatch, getState) => {
      return instance.get(fetchURL)
      .then(resp => { dispatch(setQuerySearchRecipesData({recipes: resp})) })
      .catch( (ex) => {
        console.log(ex)
      })
    }//return
  }
}//querySearchRecipes


export function getSingleRecipe(id) {
  const fetchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information?includenutrition=false"

  return (dispatch, getState) => {
    return instance.get(fetchURL)
    .then(resp => { dispatch(setSingleRecipeData({recipes: resp})) })
    .catch( (ex) => {
      console.log(ex)
    })
  }//return
}//getSingleRecipe