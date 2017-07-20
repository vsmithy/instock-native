import React from 'react'
import { combineReducers } from 'redux'
import nav from './nav'
import inventory from './inventory'
import shopping from './shopping'
import mealNav from './mealNav'
import RecipeNav from './RecipeNav'
import mealPlanning from './mealPlanning'
import persistedSettings from './persistedSettings'
import recipes from './recipes'
import chosenDetailItem from './chosenDetailItem'
import breakfastData from './breakfastData'
import lunchData from './lunchData'
import dinnerData from './dinnerData'
import dessertData from './dessertData'
import favData from './favData'
import instockSearchData from './instockSearchData'
import singleRecipeData from './singleRecipeData'

const rootReducer = combineReducers({
  nav,
  inventory,
  shopping,
  mealNav,
  mealPlanning,
  persistedSettings,
  recipes,
  RecipeNav,
  chosenDetailItem,
  breakfastData,
  lunchData,
  dinnerData,
  dessertData,
  favData,
  instockSearchData,
  singleRecipeData,
})//combineReducers

export default rootReducer

