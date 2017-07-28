import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

class DetailIngredient extends Component {
  state = {
      colorVar: '#616161'
    }//state

  handleAddToShopping(name){
    this.props.addShopItem(name)
    this.setState({ colorVar: '#80cbc4'})
    setTimeout(() => this.setState({ colorVar: '#616161' }), 1000)
  }//handleAddToShopping

  render() {
    const { itemKey, itemName, addShopItem, itemOrigString } = this.props
    const { colorVar } = this.state
    const { width } = Dimensions.get('screen')

    return (
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:width-40, marginLeft: 30, marginRight: 15, marginTop: 15 }}>
        <Text style={{fontSize: 20, color: '#616161', width:width-70 } }>{itemOrigString}</Text>
        <TouchableHighlight onPress={() => this.handleAddToShopping(itemName)}
          activeOpacity={0.3} 
          underlayColor='rgba(0,0,0,0)'>
            <FontAwesome name='cart-plus' size={28} color={colorVar} />
        </TouchableHighlight>
      </View> 
    )//return
  }//render
}//component

export default DetailIngredient