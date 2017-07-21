import React, { Component } from 'react'
import { View, ScrollView, Dimensions, Modal, TouchableHighlight, AsyncStorage, Button, Text } from 'react-native'


//the locals
import InputArea from './InputArea'
import ListArea from './ListArea'
import Header from './Header'

class Inventory extends Component {
  componentDidMount() {
    console.log('Inventory did mount')  
    this.initialSetup()
  }//comp did mount

  async componentDidUpdate(){    
    let myStringAry = JSON.stringify(this.props.inventory)
    try {
      await AsyncStorage.setItem('inventory', myStringAry)
    } catch(error){
      console.log(error)
    }//catch
  }//component did update

  async initialSetup(){
    //fetching data for initial state
      let initialState
      try {
        const initialData = await AsyncStorage.getItem('inventory')
        const parsedInitialData = JSON.parse(initialData)
        if(parsedInitialData === null || parsedInitialData.length === 0){
          initialState = [
            {
              name: 'peanut butter',
              amount: 'plenty',
              checked: false,
              id: 2
            },
            {
              name: 'jelly',
              amount: 'plenty',
              checked: false,
              id: 1
            },
            {
              name: 'thyme',
              amount: 'plenty',
              checked: false,
              id: 0
            }
          ]
        } else { initialState = parsedInitialData }
      } catch(error){
        console.log('ummm inventoryIos error: ' + error)
      }
      this.props.setInitialData(initialState)
  }//initialSetup

    onActionSelected(position){
      if (position === 0) { // index of 'Settings'
      showSettings() }
    }

  render(){
    const { width } = Dimensions.get('screen')

    return(
      <View style={{ flex: 1, width: width }}>
        <InputArea {...this.props} />
        <Header {...this.props} />
        <ScrollView><ListArea {...this.props} /></ScrollView>
      </View>
    )//return
  }//render
}//inventory


export default Inventory