import mealPlanning from './mealPlanning'
import * as types from '../actions/constants'
import sampleMeals from '../sample-data/sampleMeals'

// ADD_MEAL_ITEM
// EDIT_MEAL_ITEM
// DELETE_MEAL_ITEM
// DELETE_MEAL
// ADD_RECIPE_ITEM


//initial state
  it('should handle initial state', () => {
    expect(
      mealPlanning(undefined, {})
    ).toEqual( sampleMeals )
  })

//add an mealPlanning list item (a few examples)
  it('should handle ADD_MEAL_ITEM', () => {
    let itemDate = new Date()
    expect(
      mealPlanning([], { type: types.ADD_MEAL_ITEM, text: 'Beef Roll Up with Vegetables', whichMeal: 'dinner', notes: 'from that japanesecooking101 site i think' })
    ).toEqual([
        {
            'date': itemDate.getDate(),
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ])
    expect(
      mealPlanning([
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ], { type: types.ADD_MEAL_ITEM, text: 'Pickled Carrots and Cucumber', whichMeal: 'dinner', notes: 'use the cider vinegar' })
    ).toEqual([
        {
            'date': itemDate.getDate(),
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Pickled Carrots and Cucumber',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'use the cider vinegar',
            'id': 1
        },
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ])
  })//add meal item




//edit an mealPlanning list item
  it('should handle EDIT_MEAL_ITEM', () => {
    expect(
      mealPlanning([
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ], { type: types.EDIT_MEAL_ITEM, text: 'Pickled Carrots and Cucumber', id: 0, notes: 'use the cider vinegar' })
    ).toEqual([
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Pickled Carrots and Cucumber',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'use the cider vinegar',
            'id': 0
        }
      ])
  })//edit meal item


//delete an mealPlanning list item
  it('should handle DELETE_MEAL_ITEM', () => {
    expect(
      mealPlanning([
        {
            'date': 1498495806899,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Pickled Carrots and Cucumber',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'use the cider vinegar',
            'id': 3
        },
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ], { type: types.DELETE_MEAL_ITEM, id: 3 })
    ).toEqual([
        {
            'date': 1498495806897,
            'mealTime': 'dinner',
            'isLinked': false,
            'isFavorite': false,
            'recipeName': 'Beef Roll Up with Vegetables',
            'recipeImage':'',
            'recipeIngredients': [],
            'recipeDirections': '',
            'recipeLink': '',
            'recipeApiId': null,
            'readyInMinutes': null,
            'notes': 'from that japanesecooking101 site i think',
            'id': 0
        }
      ])
  })//delete meal item







/*
//mealplanning 
export const editMealItem = (text, id, notes) => ({ type: types.EDIT_MEAL_ITEM, text, id, notes})
export const deleteMealItem = (id) => ({ type: types.DELETE_MEAL_ITEM, id})
export const deleteMeal = (mealDate, mealType) => ({ type: types.DELETE_MEAL, mealDate, mealType})
export const addRecipeItem = (recipe) => ({ type: types.ADD_RECIPE_ITEM, recipe})


const sampleMeals = [
  {
      'date': 1498495806897,
      'mealTime': 'lunch',
      'isLinked': false,
      'isFavorite': false,
      'recipeName': 'Ham Sandwiches',
      'recipeImage':'',
      'recipeIngredients': [],
      'recipeDirections': '',
      'recipeLink': '',
      'recipeApiId': null,
      'readyInMinutes': null,
      'notes': '',
      'id': 2
  },
  {
      'date': 1498495806897,
      'mealTime': 'dinner',
      'isLinked': true,
      'isFavorite': false,
      'recipeName': 'Lemon and Rosemary Roast Chicken',
      'recipeImage':'http://www.myImage.com/qwsnecrst.jpg',
      'recipeIngredients': [
          "¼ cup sliced almonds",
          "1 bag shredded cabbage/coleslaw mix",
          "1 package chicken flavor ramen noodle soup",
          "5 green onions, chopped",
          "2 tablespoons olive oil",
          "½ teaspoon pepper",
          "½ teaspoon salt",
          "3 tablespoons sesame seeds",
          "3 tablespoons sugar",
          "3 tablespoons vinegar",
        ],
      'recipeDirections': "Toast the sesame seeds, about 350 degrees in the oven for about 10-15 minutes. Keep an eye on them to make sure they don't burn.Mix together the following to make the dressing: olive oil, vinegar, sugar, salt, pepper, green onions, chicken flavor packet from the ramen noodle package.Crush the ramen noodles until there are no large chunks (small chunks are OK).Combine the shredded cabbage and ramen noodles in a large bowl.Pour the dressing on the cabbage/noodle mixture and toss to coat.Top with the toasted sesame seeds and almonds.",
      'recipeLink': 'http://www.myImage.com/qwsnecrst',
      'recipeApiId': 630244,
      'readyInMinutes': 44,
      'notes': '',
      'id': 1
  },
  {
      'date': 1498596806897,
      'mealTime': 'dinner',
      'isLinked': false,
      'isFavorite': true,
      'recipeName': 'Beef Roll Up with Vegetables',
      'recipeImage':'',
      'recipeIngredients': [],
      'recipeDirections': '',
      'recipeLink': '',
      'recipeApiId': null,
      'readyInMinutes': null,
      'notes': 'from that japanesecooking101 site i think',
      'id': 0
  }
];


*/