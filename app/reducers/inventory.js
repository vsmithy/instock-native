import { AsyncStorage } from 'react-native'
import { ADD_INV_ITEM, EDIT_INV_ITEM, DELETE_INV_GROUP, SEND_TO_SHOPPING_LIST, SORT_INV_BY_NAME, SORT_INV_BY_AMOUNT, CHECK_FOR_DELETE, REPLENISH, SET_INITIAL_DATA } from '../actions/constants'



export default function inventory(state = [], action){
  switch(action.type){
    case SET_INITIAL_DATA:
      return [...action.data]
    case ADD_INV_ITEM:
      if(!(state.every(item => action.name !== item.name))){
        return state
      } else {
          return [
            { 
              name: action.name,
              amount: action.amount,
              checked: false,
              id: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1
            },
            ...state
          ]
      }//else
    case EDIT_INV_ITEM:
      if(action.name === '' || action.name === ' '){
        return state
      } else if(!(state.every(item => (action.name+action.amount) !== (item.name+item.amount) ))){
        return state
      } else{
        return state.map( item => 
          item.id === action.id ? { ...item, name: action.name, amount: action.amount } : item
        )
      }
    case CHECK_FOR_DELETE:
      return state.map( item => item.id === action.id ? {...item, checked: !item.checked} : item )
    case DELETE_INV_GROUP:
      return state.filter( item => item.checked === false)
    case SEND_TO_SHOPPING_LIST:
      return state
    case SORT_INV_BY_NAME:
      let sortedArray = state.sort(function(a, b){
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }

        //names are equal
        return 0
      })
      
      return [...sortedArray]
    case SORT_INV_BY_AMOUNT:
    //take state and break it into 3 arrays based on amounts (none, some, plenty)
      let noneArray = state.filter( item => item.amount === 'none' )
      let someArray = state.filter( item => item.amount === 'some' )
      let plentyArray = state.filter( item => item.amount === 'plenty' )

    //sort each of those arrays
      noneArray.sort(function(a, b){
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }

        //names are equal
        return 0
      })

      someArray.sort(function(a, b){
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }

        //names are equal
        return 0
      })

      plentyArray.sort(function(a, b){
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }

        //names are equal
        return 0
      })

    //re-join the arrays into one big array again and return it as state
      let arraySortedByAmt = noneArray.concat(someArray, plentyArray)
      return arraySortedByAmt
    case REPLENISH:
      if(state.length === 0){
        let newState = []
        for(let i=0; i<action.items.length; i++){
          newState[i] = {
            name: (action.items[i]).trim(),
            amount: 'plenty',
            checked: false,
            id: i
          }
        }//for
        return newState
      } else {
          //update anything already there
          let refilled = state.map(item => action.items.includes(item.name) ? {...item, amount: 'plenty'} : item)
          console.log('state is: ')
          console.log(refilled)
          //now make an array of items not currently in state
          let newItems = action.items.filter(function(item){
            let counter = 0
            for(let b=0; b<refilled.length; b++){
              if(refilled[b].name === item){counter++}
            }
            return counter > 0 ? false : true
          })//filter
          console.log('newItems is: ')
          console.log(newItems)
          //next add each of these new items to state
          if(newItems.length > 0){
            for(let a=0; a<newItems.length; a++){
              refilled.unshift({
                name: (newItems[a]).trim(),
                amount: 'plenty',
                checked: false,
                id: refilled.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1
              })//end unshift
            }//for
          }//if
          return refilled
      }//else
    default:
      return state
  }//switch
}//inventory