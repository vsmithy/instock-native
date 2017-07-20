import { AsyncStorage } from 'react-native'
import inventoryList from '../sample-data/inventoryList'
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
      let tempState = [...state]

      //update anything already there
      let refilled = tempState.map(item => action.items.includes(item.name) ? {...item, amount: 'plenty'} : item)

      let counter
      //loop through stuff and push any new items onto the array
      for(let i=0; i < action.items.length; i++){
        // let h  //reset the counter flag thingy
        for(let h=0; h < refilled.length; h++){
          if(action.items[i] === refilled[h].name){  break  }
          counter = h
        }//inner loop tests each element in the action.items array
        if(counter === refilled.length - 1){
          //push
            refilled.unshift({
              name: (action.items[i]).trim(),
              amount: 'plenty',
              checked: false,
              id: refilled.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1
            })//end push
        }//end counter decision
      }//outter loop
      return refilled
    default:
      return state
  }//switch
}//inventory

