import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Picker, Dimensions } from 'react-native'
import Icon from  'react-native-vector-icons/MaterialIcons'

export default class ListItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: false,
      text: 'placeholder'
    }//state
  }//constructor

  // static propTypes = {
  //   item: PropTypes.object.isRequired,
  //   editShopItem: PropTypes.func.isRequired,
  //   deletingCount: PropTypes.number.isRequired,
  //   checkForShopDelete: PropTypes.func.isRequired,
  //   markCompleted: PropTypes.func.isRequired
  // }//propTypes

  handleEditSave(){
    const { item } = this.props
    const newName = this.state.text.trim()

    this.props.editShopItem(item.id, newName)
    this.setState({ isEditing: false })
  }//handleEditSave

  render(){
    const { item } = this.props

    if(this.props.deletingCount !== 0){
      return (
        <View style={item.deleting ? styles.deleteRow : styles.row}>
          <Text style={styles.deleteText} ellipsizeMode='tail' numberOfLines={2}>{item.name}</Text>
          <TouchableHighlight onPress={() => this.props.checkForShopDelete(item.id)} style={styles.deleteIcon}  activeOpacity={0.3} underlayColor='rgba(0,0,0,0)'>
            <Icon name={item.deleting ? "remove-circle" : "radio-button-unchecked"} size={32} color='#cf2a27' />
          </TouchableHighlight>
        </View>
      )//return
    } else if(this.props.deletingCount === 0 && this.state.isEditing){
      return(
        <View style={styles.row} >
            <View style={styles.editName} >
                <TextInput 
                    onChangeText = { (text) => this.setState({ text }) }
                    ref = 'editInput'
                    style={styles.editInputField}
                    defaultValue = {item.name} 
                    onFocus = {() => this.setState({ text: item.name })}
                    placeholderTextColor = '#ddd'
                    returnKeyLabel = 'add'
                    selectTextOnFocus= {true}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    blurOnSubmit = {true}
                    onSubmitEditing = {this.handleEditSave.bind(this)}
                    fontSize = {20}
                    includeFontPadding = {false}
                    textAlignVertical = 'center'
                />
            </View>
            <TouchableHighlight 
              onPress={this.handleEditSave.bind(this)} 
              activeOpacity={0.3}
              underlayColor='rgba(0,0,0,0)'
              style={styles.editIcon}
            >
                <Icon name="done" size={32} color='#00897b' />
            </TouchableHighlight>
        </View>//entire row
      )//return
    } else {
      return(
        <View style={styles.row}>
          <TouchableHighlight
            onPress={() => this.setState({ isEditing: true, text: item.name })}
            onLongPress={() => this.props.checkForShopDelete(item.id)}
            style={styles.itemName}
            activeOpacity={0.3} underlayColor='#efebe9'>
              <Text style={item.completed ? styles.itemTextCompleted : styles.itemText} ellipsizeMode='tail' numberOfLines={2}>{item.name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.markCompleted(item.id)}
            style={styles.itemIcon}
            activeOpacity={0.3} underlayColor='rgba(0,0,0,0)'>
              <Icon name={item.completed ? "check-circle" : "radio-button-unchecked"} size={32} color='#795548' />
          </TouchableHighlight>
        </View>
      )//return
    }//if
  }//render
}//component

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    height: 50,
    width: width,
    alignItems: 'center',
    marginTop: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  itemName: {width: 0.9*(width-20)},
  itemText: { fontSize: 25, color: '#616161' },
  itemTextCompleted: { fontSize: 25, color: '#aaa', textDecorationLine: 'line-through'},
  itemIcon: {width: 0.1*(width-20)},



  deleteRow: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    height: 50,
    width: width,
    alignItems: 'center',
    marginTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#EFEBE9'
  },
  deleteText: { fontSize: 25, color: '#616161', width: 0.9*(width-20) },
  deleteIcon: {width: 0.1*(width-20)},


  editName: { borderColor: '#ddd', borderWidth: 1, width: (0.9*(width-20)-2) },
  editInputField: {margin: 0, padding: 0, marginLeft: 3, width: (0.9*(width-20))-3 },
  editIcon: {width: 0.1*(width-20) }
})//styles