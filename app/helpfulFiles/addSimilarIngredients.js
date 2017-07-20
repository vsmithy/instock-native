
const addSimilarIngredients = (initialList) => {
  //does it have this item? if so, add these, else move on...
  const refItems = [
    'vanilla',
    'vanilla extract',
    'bread',
    'flour',
    'sugar',
    'brown sugar',
    'milk',
    'egg',
    'eggs',
    'salt',
    'cilantro',
    'ginger',
    'orange',
    'oranges',
    'lemon',
    'lemons',
    'parsley',
    'rice vinegar',
    'thyme',
    'dijon',
    'dijon mustard',
    'rosemary',
    'chicken breasts',
    'ground beef',
    'mayo',
    'cranberries',
    'paprika',
    'butter',
    'mint',
    'onion',
    'coriander',
    'cumin',
    'jalapeno',
    'jalapenos',
    'chocolate chips',
  ]

  let eventList = initialList.map(item => item.date)
  let filteredList = []
  
  eventList.sort()
  filteredList[0] = eventList[0]
  for(let i=1; i < eventList.length; i++){
    let newLength = filteredList.length
    if(eventList[i] !== filteredList[newLength-1]){
      filteredList[newLength] = eventList[i]
    }//if
  }//for

  return filteredList
}//addSimilarIngredients

export default addSimilarIngredients