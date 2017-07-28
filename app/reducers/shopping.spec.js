/*
export const addShopItem = (text) => ({ type: types.ADD_SHOP_ITEM, text })
export const editShopItem = (id, text) => ({ type: types.EDIT_SHOP_ITEM, id, text })
export const deleteShopItem = () => ({ type: types.DELETE_SHOP_ITEM })
export const markCompleted = (id) => ({ type: types.MARK_COMPLETED, id })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const filterActive = () => ({ type: types.FILTER_ACTIVE })
export const filterAll = () => ({ type: types.FILTER_ALL })
export const filterCompleted = () => ({ type: types.FILTER_COMPLETED })


  //edit a shopping list item
  it('should handle EDIT_SHOP_ITEM', () => {
    expect(shopping([{},{}]), {}).toEqual([{},{}])
  })//edit_shop_item

[
  {
      'name':'potatoes',
      'completed': false,
      'deleting': false,
      'id': 2
  },
  {
      'name':'peas',
      'completed': false,
      'deleting': false,
      'id': 1
  },
  {
      'name':'cereal',
      'completed': false,
      'deleting': false,
      'id': 0
  }
]


*/


import shopping from './shopping'
import * as types from '../actions/constants'
import shoppingList from '../sample-data/shoppingList'

//initial state
  it('should handle initial state', () => {
    expect(
      shopping(undefined, {})
    ).toEqual( shoppingList )
  })

//add an shopping list item (a few examples)
  it('should handle ADD_SHOP_ITEM', () => {
    expect(
      shopping([], { type: types.ADD_SHOP_ITEM, text: 'hair clips' })
    ).toEqual([
      {
      'name':'hair clips',
      'completed': false,
      'deleting': false,
      'id': 0
      }
    ])

    expect(
      shopping([
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
      ], { type: types.ADD_SHOP_ITEM, text: 'eggs' })
    ).toEqual([
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
      ])

    expect(
      shopping([
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
      ], { type: types.ADD_SHOP_ITEM, text: 'pie' })
    ).toEqual([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ])
  })//add shop item


  //edit a shopping list item
  it('should handle EDIT_SHOP_ITEM', () => {
    expect(shopping([
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
      ], { type: types.EDIT_SHOP_ITEM, id: 1, text: 'huevos' }))
    .toEqual([
        {
          'name':'huevos',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
      ])
  })//edit_shop_item

  //delete a shopping item(s)
  it('should handle DELETE_SHOP_ITEM', () => {
    expect(shopping([
        {
          'name':'pie',
          'completed': false,
          'deleting': true,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': true,
          'id': 0
        }
    ], { type: types.DELETE_SHOP_ITEM }))
    .toEqual([
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        }
    ])
  })//DELETE_SHOP_ITEM

  //mark something as completed
  it('should handle MARK_COMPLETED', () => {
    expect(shopping([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ], { type: types.MARK_COMPLETED, id: 1 }))
    .toEqual([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': true,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ])
  })//MARK_COMPLETED


    //mark something as completed
  it('should handle CLEAR_COMPLETED', () => {
    expect(shopping([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': true,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ], { type: types.CLEAR_COMPLETED }))
    .toEqual([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ])
  })//CLEAR_COMPLETED

  //check something so that it can be deleted
  it('should handle CHECK_FOR_SHOP_DELETE', () => {
    expect(shopping([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': false,
          'deleting': false,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ], { type: types.CHECK_FOR_SHOP_DELETE, id: 1 }))
    .toEqual([
        {
          'name':'pie',
          'completed': false,
          'deleting': false,
          'id': 2
        },
        {
          'name':'eggs',
          'completed': false,
          'deleting': true,
          'id': 1
        },
        {
          'name':'hair clips',
          'completed': false,
          'deleting': false,
          'id': 0
        }
    ])
  })//CHECK_FOR_SHOP_DELETE