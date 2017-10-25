import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Picker, Button, Dimensions } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class InputArea extends Component {
  constructor(props){
    super(props)

    this.state = {
      text: ''
    }//state
  }//constructor

  // static propTypes = {
  //   addMealItem: PropTypes.func.isRequired
  // }//proptypes

  addPress(){
    if(this.state.text !== '' || this.state.text !== ' ' ){
      this.props.addMealItem(this.state.text, this.props.persistedSettings.chosenDate, this.props.whichMeal)
      this.refs.addInput.clear()
    }//if
  }//addPress

  render(){
      return(
        <View  style={styles.area} >
          <View style={styles.input} >
            <TextInput 
              onChangeText = { (text) => this.setState({ text }) }
              ref = 'addInput'
              placeholder = 'add item...' 
              placeholderTextColor = '#ddd'
              returnKeyLabel = 'add'
              selectTextOnFocus= {true}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              blurOnSubmit = {false}
              onSubmitEditing = {this.addPress.bind(this)}
              fontSize = {20}
              includeFontPadding = {false}
              textAlignVertical = 'center'
            />
          </View>
          <View>
            <TouchableHighlight 
                onPress={this.addPress.bind(this)}
                underlayColor="#BCAAA4"
                activeOpacity={0.3}
                underlayColor='rgba(0,0,0,0)'
                style={ styles.icon }
            >
              <Icon name="add-box" size={32} color='#795548' />
            </TouchableHighlight>
          </View>
        </View>
      )//return
  }//render
}//end of component

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create ({
  area: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 5,
    borderBottomColor: '#d7ccc8',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    height: 50, 
    width: width
  },
  input: {
    borderColor: '#ddd', height: 50, borderWidth: 0, width: 0.9*(width - 20)
  },
  icon: {width: 0.1*(width - 20)} 
})//styles