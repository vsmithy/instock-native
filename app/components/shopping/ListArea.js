import React, { Component, PropTypes } from 'react'
import { View, Text, Button } from 'react-native'

//the locals
import ListItem from './ListItem'

export default class ListArea extends Component {
  static propTypes = {
    shopping: PropTypes.array.isRequired,
    checkForShopDelete: PropTypes.func.isRequired, 
    editShopItem: PropTypes.func.isRequired, 
    deletingCount: PropTypes.number.isRequired, 
    markCompleted: PropTypes.func.isRequired, 
    filteredShoppingList: PropTypes.array.isRequired,
  }//proptypes

  render(){
    const { shopping, checkForShopDelete, editShopItem, deletingCount, markCompleted, filteredShoppingList } = this.props

    return(
      <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
        {
          filteredShoppingList
            .map((item) => <ListItem 
                key={item.id} 
                item={item} 
                editShopItem={editShopItem} 
                checkForShopDelete={checkForShopDelete} 
                deletingCount={deletingCount} 
                markCompleted={markCompleted}
            />)
        }
      </View>
    )//return
  }//render
}//component