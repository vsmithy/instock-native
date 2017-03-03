import React, { Component } from 'react'
import { Text, View, TextInput, TouchableHighlight, Picker, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class SearchArea extends Component {
  constructor(){
      super()

      this.addPress = this.addPress.bind(this)
      this.handleRender = this.handleRender.bind(this)
      this.deleteMultiple = this.deleteMultiple.bind(this)

      this.state = ({
          text: 'placeholder',
          amt: 'plenty'
      })//state
  }//constructor

  addPress(){
      this.props.handleAdd(this.state.text, this.state.amt)
      this.refs.addInput.clear()
  }//addPress

  deleteMultiple(){
    //remove the items in the array (if there are any)
    this.props.deleteQuery()

    //change the mode
    this.props.modeChange()
  }//deleteMultiple

  handleRender(){
    const addIcon = (<Icon name="add-box" size={30} color="#4E342E" />)
    const deleteIcon = (<Icon name="delete" size={50} color="#E53935" />)
    if(this.props.deleteMode){
      return (
        <View  style={styles.deleting} >
          <TouchableHighlight 
              onPress={this.deleteMultiple}
              underlayColor="#BCAAA4"
              activeOpacity={0.5}
              underlayColor='#ddd'
          >
            <Text>{ deleteIcon }</Text>
          </TouchableHighlight>
        </View>
      )//return
    } else {
        return (
          <View  style={styles.area} >
            <View style={styles.input} ><TextInput 
              onChangeText = { (text) => this.setState({ text }) }
              ref = 'addInput'
              placeholder = 'add item...' 
              placeholderTextColor = '#ddd'
              returnKeyLabel = 'add'
              selectTextOnFocus= {true}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              blurOnSubmit = {false}
              onSubmitEditing = {this.addPress}
              fontSize = {20}
              includeFontPadding = {false}
              textAlignVertical = 'center'
            /></View>
            <Picker 
                ref='editAmount'
                style={styles.drop}
                selectedValue={this.state.amt}
                onValueChange={(amt) => this.setState({amt})}
                fontSize={20}
                includeFontPadding={false}
                mode='dropdown'
                >
              <Picker.Item label="Plenty" value="plenty" />
              <Picker.Item label="Some" value="some" />
              <Picker.Item label="None" value="none" />
            </Picker>
            <View><TouchableHighlight 
                onPress={this.addPress}
                underlayColor="#BCAAA4"
                activeOpacity={0.5}
                underlayColor='#ffecb3'
            ><Text>{ addIcon }</Text></TouchableHighlight></View>
          </View>
        )//return
    }//else
  }//handleRender

  render() {
    return this.handleRender()
  }//render
}//Component

const styles = StyleSheet.create ({
  area: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomColor: '#ddd',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid'
  },
  input: {
    borderColor: '#ddd', borderWidth: 0, flex: 7
  },
  drop: {flex: 4},
  btn: {flex: 1},
  deleting: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomColor: '#ddd',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid'
  }
})

