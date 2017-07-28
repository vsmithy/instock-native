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
import singleRecipeData from './singleRecipeData'
import favData from './favData'

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
  favData,
  singleRecipeData,
})//combineReducers

export default rootReducer

