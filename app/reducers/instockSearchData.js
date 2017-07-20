import { SET_INSTOCK_SEARCH_DATA } from '../actions/constants'

export default function instockSearchData(state = [], action) {
  switch (action.type) {
    case SET_INSTOCK_SEARCH_DATA:
      return [...action.recipes.data]
    default:
      return state
  }
}