import React, { Component, PropTypes } from 'react'
import { View, Text, Button } from 'react-native'

//the locals
import ListItem from './ListItem'

export default class ListArea extends Component {
  
  static propTypes = {
    inventory: PropTypes.array.isRequired, 
    checkForDelete: PropTypes.func.isRequired, 
    editInvItem: PropTypes.func.isRequired, 
    checkedCount: PropTypes.number.isRequired, 
    addShopItem: PropTypes.func.isRequired
  }//proptypes

  render(){
    const { inventory, checkForDelete, editInvItem, checkedCount, addShopItem } = this.props
    return(
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
        {
          Object
            .keys(inventory)
            .map((key) => <ListItem 
              key={key} 
              item={inventory[key]} 
              editInvItem={editInvItem} 
              checkForDelete={checkForDelete} 
              checkedCount={checkedCount} 
              addShopItem={addShopItem}
            />)
        }
      </View>
    )//return
  }//render
}//component
