import inventory from './inventory'
import * as types from '../actions/constants'
import inventoryList from '../sample-data/inventoryList'

// expect(
//   inventory([  curr state    ], { action obj })
// ).toEqual([  new state ])

//initial state
  it('should handle initial state', () => {
    expect(
      inventory(undefined, {})
    ).toEqual( inventoryList )
  })

//add an inventory item (a few examples)
  it('should handle ADD_INV_ITEM', () => {
    expect(
      inventory([], { type: types.ADD_INV_ITEM, name: 'I love ham sandwiches', amount: 'plenty' })
    ).toEqual([
      {
        name:'I love ham sandwiches',
        amount: 'plenty',
        checked: false,
        id: 0
      }
    ])

    expect(
      inventory([
        {
          'name':'brown sugar',
          'amount': 'none',
          'checked': false,
          'id': 0
        }
      ], { type: types.ADD_INV_ITEM, name: 'I love ham sandwiches', amount: 'plenty' })
    ).toEqual([
        {
            'name':'I love ham sandwiches',
            'amount': 'plenty',
            'checked': false,
            'id': 1
        },
        {
            'name':'brown sugar',
            'amount': 'none',
            'checked': false,
            'id': 0
        }
      ])

    expect(
      inventory([
        {
            'name':'milk',
            'amount': 'some',
            'checked': false,
            'id': 1
        },
        {
            'name':'brown sugar',
            'amount': 'none',
            'checked': false,
            'id': 0
          }
        ], { type: types.ADD_INV_ITEM, name: 'I love ham sandwiches', amount: 'plenty' })
    ).toEqual([
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': false,
          'id': 1
      },
      {
          'name':'brown sugar',
          'amount': 'none',
          'checked': false,
          'id': 0
      }
    ])
  })

//edit inventory item
  it('should handle EDIT_INV_ITEM', () => {
    expect(
      inventory([
        {
            'name':'I love ham sandwiches',
            'amount': 'plenty',
            'checked': false,
            'id': 1
        },
        {
            'name':'brown sugar',
            'amount': 'none',
            'checked': false,
            'id': 0
        }
      ], { type: types.EDIT_INV_ITEM, id: 1, name: 'I hate ham sandwiches', amount: 'none' })
    ).toEqual([
        {
            'name':'I hate ham sandwiches',
            'amount': 'none',
            'checked': false,
            'id': 1
        },
        {
            'name':'brown sugar',
            'amount': 'none',
            'checked': false,
            'id': 0
        }
      ])
  })

//check for deletion
it('should handle CHECK_FOR_DELETE', () => {
    expect(
      inventory([
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      }
    ], { type: types.CHECK_FOR_DELETE, id: 2 })
    ).toEqual([
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': true,
          'id': 2
      }
    ])
  })

//delete inv item
it('should handle DELETE_INV_GROUP', () => {
    expect(
      inventory([
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'brown sugar',
          'amount': 'none',
          'checked': true,
          'id': 0
      }
    ], { type: types.DELETE_INV_GROUP })
    ).toEqual([
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      }
    ])
  })

it('should not generate duplicate ids after DELETE_INV_GROUP', () => {
    expect(
      [
        { type: types.DELETE_INV_GROUP }, 
        { type: types.ADD_INV_ITEM, name: 'I hate ham sandwiches', amount: 'some' }
      ].reduce(inventory, [
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'brown sugar',
          'amount': 'none',
          'checked': true,
          'id': 0
      }
    ])
    ).toEqual([
      {
          'name':'I hate ham sandwiches',
          'amount': 'some',
          'checked': false,
          'id': 3
      },
      {
          'name':'I love ham sandwiches',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      }
    ])
  })


//sort inventory by name
it('should handle SORT_INV_BY_NAME', () => {
    expect(
      inventory([
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'grapes',
          'amount': 'none',
          'checked': true,
          'id': 0
      }
    ], { type: types.SORT_INV_BY_NAME })
    ).toEqual([
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'grapes',
          'amount': 'none',
          'checked': true,
          'id': 0
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      }
    ])
  })


//sort inventory by amount
it('should handle SORT_INV_BY_AMOUNT', () => {
    expect(
      inventory([
      {
          'name':'ham',
          'amount': 'some',
          'checked': false,
          'id': 5
      },      
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 4
      },      
      {
          'name':'toast',
          'amount': 'plenty',
          'checked': false,
          'id': 3
      },
      {
          'name':'mango',
          'amount': 'none',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'grapes',
          'amount': 'none',
          'checked': true,
          'id': 0
      }
    ], { type: types.SORT_INV_BY_AMOUNT })
    ).toEqual([
      {
          'name':'grapes',
          'amount': 'none',
          'checked': true,
          'id': 0
      },
      {
          'name':'mango',
          'amount': 'none',
          'checked': false,
          'id': 2
      },
      {
          'name':'ham',
          'amount': 'some',
          'checked': false,
          'id': 5
      },      
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 4
      },      
      {
          'name':'toast',
          'amount': 'plenty',
          'checked': false,
          'id': 3
      },
    ])
  })



  //handle a replenish request
it('should handle REPLENISH', () => {
    expect(
      inventory([
      {
          'name':'ham',
          'amount': 'some',
          'checked': false,
          'id': 5
      },      
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 4
      },      
      {
          'name':'toast',
          'amount': 'plenty',
          'checked': false,
          'id': 3
      },
      {
          'name':'mango',
          'amount': 'none',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'some',
          'checked': true,
          'id': 1
      },
      {
          'name':'grapes',
          'amount': 'none',
          'checked': true,
          'id': 0
      }
    ], { type: types.REPLENISH, items: ['mango', 'milk', 'grapes', 'scissors', 'eggs', 'beans'] })
    ).toEqual([
      {
          'name':'beans',
          'amount': 'plenty',
          'checked': false,
          'id': 7
      },
      {
          'name':'scissors',
          'amount': 'plenty',
          'checked': false,
          'id': 6
      },
      {
          'name':'ham',
          'amount': 'some',
          'checked': false,
          'id': 5
      },      
      {
          'name':'eggs',
          'amount': 'plenty',
          'checked': false,
          'id': 4
      },      
      {
          'name':'toast',
          'amount': 'plenty',
          'checked': false,
          'id': 3
      },
      {
          'name':'mango',
          'amount': 'plenty',
          'checked': false,
          'id': 2
      },
      {
          'name':'milk',
          'amount': 'plenty',
          'checked': true,
          'id': 1
      },
      {
          'name':'grapes',
          'amount': 'plenty',
          'checked': true,
          'id': 0
      }
    ])
  })