import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Header extends Component {
  constructor(){
      super()

      this.onButtonPress = this.onButtonPress.bind(this)
  }//constructor

  onButtonPress(){
      this.props.navigator.push({
          pg: 'Inventory'
      })
  }//onButtonPress

  render() {
    const brailleIcon = (<Icon name="braille" size={25} color="#FFF" />)
    return (
      <View style={styles.head} >
        <Text style={styles.txt}>Shopping List</Text>
        <TouchableHighlight onPress={this.onButtonPress} style={styles.btn} ><Text>{ brailleIcon }</Text></TouchableHighlight>
      </View>
    )//return
  }//render
}//Component

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b2dfdb'
  },

  btn: {
    backgroundColor: '#b2dfdb',
    paddingRight: 10
  },

  txt: {
    fontSize: 30,
    color: '#fff',
    paddingLeft: 10
  }
})

