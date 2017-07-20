import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TextInput, PickerIOS, Button, Dimensions, AsyncStorage } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class InputArea extends Component {
  constructor(props){
    super(props)

    this.state = {
      text: '',
      amt: 'plenty'
    }//state
  }//constructor

  static propTypes = {
    addInvItem: PropTypes.func.isRequired,
    deleteInvGroup: PropTypes.func.isRequired,
    checkedCount: PropTypes.number.isRequired,
  }//proptypes

  addPress(){
    if(this.state.text !== '' || undefined){
      this.props.addInvItem(this.state.text.trim(), this.state.amt)
      this.refs.addInput.clear()
    }//if
  }//addPress

  render(){
    if(this.props.checkedCount !== 0){
      return(
        <TouchableHighlight onPress={() => this.props.deleteInvGroup()} style={styles.areaDelete} activeOpacity={0.3} underlayColor='#ef9a9a'>
          <MaterialIcons name="delete" size={40} color='#fff' />
        </TouchableHighlight>
      )
    } else {
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
              clearTextOnFocus= {true}
              keyboardAppearance='default'
              spellCheck={false}
              clearButtonMode='never'
              enablesReturnKeyAutomatically={true}
            />
          </View>
          <PickerIOS 
              itemStyle={styles.picker}
              selectedValue={this.state.amt}
              onValueChange={(amt) => this.setState({amt})}
              fontSize={20}
              includeFontPadding={false}
            >
            <PickerIOS.Item label="Plenty" value="plenty" />
            <PickerIOS.Item label="Some" value="some" />
            <PickerIOS.Item label="None" value="none" />
          </PickerIOS>
          <View>
            <TouchableHighlight 
                onPress={this.addPress.bind(this)}
                underlayColor="#BCAAA4"
                activeOpacity={0.3}
                underlayColor='rgba(0,0,0,0)'
                style={styles.addIcon}
            >
              <MaterialIcons name="add-box" size={32} color='#80cbc4' />
            </TouchableHighlight>
          </View>
        </View>
      )//return
    }//if statement
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
    marginTop: 15,
    height: 50, 
    borderBottomColor: '#80cbc4',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    width: width
  },
  areaDelete: { 
    width: width, 
    height: 50, 
    backgroundColor: '#cf2a27', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ddd', borderWidth: 0, width: 0.62*(width-20), 
  },
  picker: {width: 0.3*(width-20)},
  addIcon: { width: 0.08*(width-20) }
})//styles