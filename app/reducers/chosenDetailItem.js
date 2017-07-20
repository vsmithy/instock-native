import { UPDATE_DETAIL_RECIPE } from '../actions/constants'

const initialState =   [{
		"id":443195,
		"title":"Venison Pepper Stew",
		"readyInMinutes":120,
		"image":"https://spoonacular.com/recipeImages/Venison-Pepper-Stew-443195.jpg",
		"extendedIngredients":[
			{"id":2004,"aisle":"Produce;Spices and Seasonings","image":"https://spoonacular.com/cdn/ingredients_100x100/bay-leaves.jpg","name":"bay leaf","amount":1,"unit":"","unitShort":"","unitLong":"","originalString":"1 bay leaf","metaInformation":[]},{"id":13786,"aisle":"Meat","image":"https://spoonacular.com/cdn/ingredients_100x100/beef-chuck-roast.png","name":"beef chuck roast","amount":0.5,"unit":"pound","unitShort":"lb","unitLong":"pounds","originalString":"1/2 pound venison stew meat or boneless beef chuck roast, cut into 1-inch cubes","metaInformation":["boneless","cut into 1-inch cubes"]},{"id":4582,"aisle":"Oil, Vinegar, Salad Dressing","image":"https://spoonacular.com/cdn/ingredients_100x100/vegetable-oil.jpg","name":"canola oil","amount":2,"unit":"tablespoons","unitShort":"Tbsp","unitLong":"tablespoons","originalString":"2 tablespoons bacon drippings or canola oil","metaInformation":[]},{"id":11124,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/carrots.jpg","name":"carrot","amount":1,"unit":"","unitShort":"","unitLong":"","originalString":"1 small carrot, sliced","metaInformation":["small","sliced"]},{"id":2031,"aisle":"Spices and Seasonings","image":"https://spoonacular.com/cdn/ingredients_100x100/chili-powder.jpg","name":"cayenne pepper","amount":0.125,"unit":"teaspoon","unitShort":"tsp","unitLong":"teaspoons","originalString":"1/8 teaspoon cayenne pepper","metaInformation":[]},{"id":11143,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/celery.jpg","name":"celery","amount":0.25,"unit":"cup","unitShort":"cup","unitLong":"cups","originalString":"1/4 cup chopped celery","metaInformation":["chopped"]},{"id":2048,"aisle":"Oil, Vinegar, Salad Dressing","image":"https://spoonacular.com/cdn/ingredients_100x100/apple-cider-vinegar.jpg","name":"cider vinegar","amount":1,"unit":"teaspoon","unitShort":"tsp","unitLong":"teaspoon","originalString":"1 teaspoon cider vinegar","metaInformation":[]},{"id":20081,"aisle":"Baking","image":"https://spoonacular.com/cdn/ingredients_100x100/flour.png","name":"flour","amount":0.3333333333333333,"unit":"cup","unitShort":"cup","unitLong":"cups","originalString":"1/3 cup all-purpose flour","metaInformation":["all-purpose"]},{"id":11215,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg","name":"garlic clove","amount":1,"unit":"","unitShort":"","unitLong":"","originalString":"1 small garlic clove, minced","metaInformation":["minced","small"]},{"id":1012030,"aisle":"Spices and Seasonings","image":"https://spoonacular.com/cdn/ingredients_100x100/lemonpepper.jpg","name":"lemon-pepper seasoning","amount":0.25,"unit":"teaspoon","unitShort":"tsp","unitLong":"teaspoons","originalString":"1/4 teaspoon lemon-pepper seasoning","metaInformation":[]},{"id":11282,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/brown-onion.jpg","name":"onion","amount":0.3333333333333333,"unit":"cup","unitShort":"cup","unitLong":"cups","originalString":"1/3 cup chopped onion","metaInformation":["chopped"]},{"id":1002030,"aisle":"Spices and Seasonings","image":"https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg","name":"pepper","amount":0.125,"unit":"teaspoon","unitShort":"tsp","unitLong":"teaspoons","originalString":"1/8 teaspoon pepper","metaInformation":[]},{"id":11362,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/potatoes-yukon-gold.jpg","name":"potato","amount":1,"unit":"","unitShort":"","unitLong":"","originalString":"1 small potato, peeled and cubed","metaInformation":["small","cubed","peeled"]},{"id":2047,"aisle":"Spices and Seasonings","image":"https://spoonacular.com/cdn/ingredients_100x100/salt.jpg","name":"salt","amount":0.25,"unit":"teaspoon","unitShort":"tsp","unitLong":"teaspoons","originalString":"1/4 teaspoon salt","metaInformation":[]},{"id":11529,"aisle":"Produce","image":"https://spoonacular.com/cdn/ingredients_100x100/roma-tomatoes.jpg","name":"tomato","amount":1,"unit":"","unitShort":"","unitLong":"","originalString":"1 small tomato, peeled and chopped","metaInformation":["small","peeled","chopped"]},{"id":14412,"aisle":"Beverages","image":"https://spoonacular.com/cdn/ingredients_100x100/water.jpg","name":"water","amount":1,"unit":"cup","unitShort":"cup","unitLong":"cup","originalString":"1 cup water","metaInformation":[]
			}
		],
		"analyzedInstructions":[
			{
				"name":"","steps":[{"number":1,"step":"In a large resealable plastic bag, combine the flour, salt and pepper.","ingredients":[{"id":1102047,"name":"salt and pepper","image":"https://spoonacular.com/cdn/ingredients_100x100/salt-and-pepper.jpg"},{"id":20081,"name":"all purpose flour","image":"https://spoonacular.com/cdn/ingredients_100x100/flour.png"}],"equipment":[{"id":221671,"name":"ziploc bags","image":"https://spoonacular.com/cdn/equipment_100x100/plastic-bag.jpg"}]},{"number":2,"step":"Add venison, a few pieces at a time, and shake to coat.","ingredients":[],"equipment":[]},{"number":3,"step":"In a large heavy saucepan, brown meat in drippings on all sides.","ingredients":[],"equipment":[{"id":404669,"name":"sauce pan","image":"https://spoonacular.com/cdn/equipment_100x100/sauce-pan.jpg"}]},{"number":4,"step":"Add onion; cook and stir for 1 minute. Stir in the water, tomato, vinegar, garlic and bay leaf. Bring to a boil. Reduce heat; cover and simmer for 1 to 1-1/2 hours or until meat is tender.","ingredients":[{"id":2004,"name":"bay leaves","image":"https://spoonacular.com/cdn/ingredients_100x100/bay-leaves.jpg"},{"id":11215,"name":"garlic","image":"https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg"},{"id":11529,"name":"tomato","image":"https://spoonacular.com/cdn/ingredients_100x100/tomato.jpg"},{"id":11282,"name":"onion","image":"https://spoonacular.com/cdn/ingredients_100x100/brown-onion.jpg"},{"id":14412,"name":"water","image":"https://spoonacular.com/cdn/ingredients_100x100/water.jpg"}],"equipment":[],"length":{"number":1,"unit":"minutes"}},{"number":5,"step":"Stir in the remaining ingredients. Return to a boil. Reduce heat; cover and simmer 30-35 minutes longer or until vegetables are tender. Discard bay leaf.","ingredients":[{"id":2004,"name":"bay leaves","image":"https://spoonacular.com/cdn/ingredients_100x100/bay-leaves.jpg"}],"equipment":[],"length":{"number":35,"unit":"minutes"}}]
			}
		]
  }]

export default function chosenDetailItem(state = initialState, action){
  switch(action.type){
    case UPDATE_DETAIL_RECIPE:
      return [{
        "id":action.id,
		    "title":action.title,
		    "readyInMinutes":action.readyInMinutes,
		    "image":action.image,
		    "extendedIngredients":action.extendedIngredients,
        "analyzedInstructions":action.analyzedInstructions
      }]
    default:
      return state
  }//switch
}//chosenDetailItem














