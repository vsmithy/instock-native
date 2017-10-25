import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Image } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons'

class AddButton extends Component {
  render() {
    const { width } = Dimensions.get('screen')
    const { navigation } = this.props
    return (
        <TouchableHighlight 
          onPress={() => navigation.dispatch({ type: this.props.navChoice })}   
          activeOpacity={0.3} 
          underlayColor='#8D6E63' 
          style={{ 
            backgroundColor: '#795548', 
            elevation: 2, 
            borderRadius: 50, 
            height: 56, 
            width: 56, 
            position: 'absolute', 
            bottom: 16, 
            right:16,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text><Icon name='add' size={24} color='#fff' /></Text>
        </TouchableHighlight>
    )//return
  }//render
}//component

export default AddButton
