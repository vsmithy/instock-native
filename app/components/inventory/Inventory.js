import React, { Component } from 'react'
import { View, ScrollView, Dimensions, Modal, TouchableHighlight, AsyncStorage, Button, Text, StatusBar, Animated } from 'react-native'


//the locals
import InputArea from './InputArea'
import ListArea from './ListArea'
import Header from './Header'
import AddButton from './AddButton'

class Inventory extends Component {
  constructor(props){
    super(props)

    this.toggleAdding = this.toggleAdding.bind(this)
    this.handleHeight = this.handleHeight.bind(this)
    this.state = { 
      adding: false, 
      slideVertical: new Animated.Value(0),
      inputHeight: 0 
    }
  }

  componentDidMount() {
    // console.log('Inventory did mount')  
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
        console.log('ummm inventory error: ' + error)
      }
      this.props.setInitialData(initialState)
  }//initialSetup

  onActionSelected(position){
    if (position === 0) { // index of 'Settings'
    showSettings() }
  }

  toggleAdding(){
    let nextState = !this.state.adding

    this.setState({ adding: nextState })
  }

  slideUp(){
    Animated.timing(
      this.state.slideVertical,
      {
        toValue:1,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideUp

  slideDown(){
    Animated.timing(
      this.state.slideVertical,
      {
        toValue:0,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideDown

  handleHeight(direction){
    if(direction === 'up'){
      this.setState({ inputHeight: 51 })
    } else {
      setTimeout(() => {
        this.setState({ inputHeight: 0 })
      }, 250)
    }
  }

  render(){
    const { width } = Dimensions.get('screen')

    //animations
    let slideVert = this.state.slideVertical.interpolate({
      inputRange: [0,.5,1],
      outputRange: [41,40,0]
    })
    let deleteBtn = this.props.checkedCount !== 0 ? 51 : this.state.inputHeight
    let deleteBtnHt = this.props.checkedCount !== 0 ? 0 : slideVert

    return(
      <View style={{ flex: 1, width: width }}>
        <StatusBar backgroundColor='#80CBC4' barStyle='dark-content' />
        <Header {...this.props} />
        <ScrollView><ListArea {...this.props} /></ScrollView>
        <Animated.View style={{ height: deleteBtn, transform: [{ translateY: deleteBtnHt }] }}>
          <InputArea {...this.props} />
        </Animated.View>
        <AddButton {...this.props} toggleAdding={this.toggleAdding} addingState={ this.state.adding } slideInputDown={this.slideDown.bind(this)} slideInputUp={this.slideUp.bind(this)} handleInputHeight={this.handleHeight} />
      </View>
    )//return
  }//render
}//inventory

export default Inventory
