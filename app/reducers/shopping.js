import { ADD_SHOP_ITEM,EDIT_SHOP_ITEM,DELETE_SHOP_ITEM,MARK_COMPLETED,CLEAR_COMPLETED,CHECK_FOR_SHOP_DELETE, SET_INITIAL_SHOPPING_DATA } from '../actions/constants'
// import shoppingList from '../sample-data/shoppingList'

// const initialState = shoppingList


export default function shopping(state = [], action){
  switch(action.type){
    case SET_INITIAL_SHOPPING_DATA:
      return [...action.data]
    case ADD_SHOP_ITEM:
      if(!(state.every(item => action.text !== item.name))){
        // alert(action.name + ' already exists')
        return state
      } else {
          return [
            {
              'name': action.text,
              'completed': false,
              'deleting': false,
              'id': state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1
            },
            ...state
          ]
      }//else
    case EDIT_SHOP_ITEM:
      if(action.text === '' || action.text === ' '){
        return state
      } else if(!(state.every(item => (action.text) !== (item.name) ))){
        return state
      } else{
          return state.map((item) => item.id === action.id ? {...item, name: action.text} : item)
      }
    case DELETE_SHOP_ITEM:
      return state.filter((item) => item.deleting === false)
    case MARK_COMPLETED:
      return state.map((item) => item.id === action.id ? {...item, completed: !item.completed} : item)
    case CLEAR_COMPLETED:
      return state.filter((item) => item.completed === false)
    case CHECK_FOR_SHOP_DELETE:
      return state.map((item) => item.id === action.id ? {...item, deleting: !item.deleting} : item)
    default:
      return state
  }//switch
}//shopping
