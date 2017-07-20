import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

class AddButton extends Component {
  render() {
    const { width } = Dimensions.get('screen')
    const { navigation } = this.props
    return (
        <TouchableHighlight 
          onPress={() => navigation.dispatch({ type: this.props.navChoice })}   
          activeOpacity={0.3} 
          underlayColor='#eof2f1' 
          style={{ 
            backgroundColor: '#80cbc4', 
            elevation: 2, 
            borderRadius: 50, 
            height: 56, 
            width: 56, 
            position: 'absolute', 
            bottom: 50, 
            right: 25,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text><MaterialIcons name='add' size={32} color='#fff' /></Text>
        </TouchableHighlight>
    )//return
  }//render
}//component

export default AddButton