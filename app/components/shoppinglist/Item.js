import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput, Picker, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Item extends Component {
  constructor(){
    super()

    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleRender = this.handleRender.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.handleEditSave = this.handleEditSave.bind(this)
    this.toggleDeleting = this.toggleDeleting.bind(this)
    this.onEditFocus = this.onEditFocus.bind(this)

    this.state = ({
      text: 'add...',
      amt: 'plenty'
    })//state
  }//constructor

  handleRemove(){
    //if in deleteMode, then just toggleDeleting
    if(this.props.deleteMode){
      this.toggleDeleting()
    } else {
      this.props.handleRemove(this.props.items)      
    } //else
  }//handleRemove

  handleEdit(){
    //if in deleteMode, then just toggleDeleting
    if(this.props.deleteMode){
      this.toggleDeleting()
    } else {
        //set state for dropdown
        this.setState({ amt: this.props.items.amount })
        this.setState({ text: this.props.items.name })

        //change the isEditing flag
        this.props.handleEdit(this.props.items)   
    } //else
  }//handleEdit

  toggleDeleting(){
    //change the isDeleting state of item
    this.props.handleToggleDeleting(this.props.items)  
  }//toggleDeleting

  onEditFocus(){
    this.setState({ text: this.props.items.name })
  }

  toggleCompleted(){
    this.props.handleToggleCompleted(this.props.items) 
  }

  handleEditSave(){
    const items = this.props.items
    const newName = this.state.text

    this.props.handleEditSave(items, newName)
  }//handleEditSave

  handleRender(){
    const items = this.props.items
    const addIcon = (<Icon name="add" size={15} color="#4E342E" />)
    const shopIcon = (<Icon name="shopping-cart" size={25} color="#4E342E" />)
    const clearIcon = (<Icon name="clear" size={25} color="#4E342E" />)
    const saveIcon = (<Icon name="save" size={25} color="#4E342E" />)
    const removeIcon = (<Icon name="remove" size={25} color="#4E342E" />)
    const checkIcon = (<Icon name="check-circle" size={25} color={this.props.items.completed ? '#00897b' : '#D7CCC8'} />)
    const removeCircleIcon = (<Icon name="remove-circle" size={25} color="#E53935" />)

    if(items.isEditing){
      return (
        <View style={styles.row} >
            <View style={styles.edName} >
                <TextInput 
                    onChangeText = { (text) => this.setState({ text }) }
                    ref = 'editInput'
                    style={styles.edInputField}
                    width={180}
                    defaultValue = {this.props.items.name} 
                    onFocus = {this.onEditFocus}
                    placeholderTextColor = '#ddd'
                    returnKeyLabel = 'add'
                    selectTextOnFocus= {true}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    blurOnSubmit = {false}
                    onSubmitEditing = {this.handleEditSave}
                    fontSize = {20}
                    includeFontPadding = {false}
                    textAlignVertical = 'center'
                />
            </View>

            <View style={styles.edIcons}>
                <TouchableHighlight 
                  onPress={this.handleEditSave} 
                  activeOpacity={0.5}
                  underlayColor='#ffecb3'
                >
                    <Text style={{marginLeft: 15}}>{ saveIcon }</Text>
                </TouchableHighlight>
            </View>
        </View>//entire row
      )//return
    }//if
    else if (items.isDeleting){
      return (
        <View style={styles.rowDelete}  >
            <TouchableNativeFeedback
              onPress={this.toggleDeleting}
              onLongPress={this.handleRemove} 
              background={TouchableNativeFeedback.Ripple('#ffecb3', true)}
              useForeground={true}
            >
                <View>
                    <Text style={styles.name}  >{ this.props.items.name }</Text>
                </View>
            </TouchableNativeFeedback>

            <View style={styles.icons}>
                <TouchableNativeFeedback 
                  onPress={this.toggleDeleting} 
                  background={TouchableNativeFeedback.Ripple('#ffecb3', true)}
                  useForeground={true}
                >
                    <View>
                        <Text>{ removeCircleIcon }</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>//entire row
      )//return
    }
    else {
      return (
        <View style={styles.row}  >
            <TouchableNativeFeedback
                onPress={this.props.items.completed ? this.toggleCompleted : this.handleEdit}
                onLongPress={this.handleRemove} 
                background={TouchableNativeFeedback.Ripple('#ffecb3', true)}
                useForeground={true}
            >
                <View>
                    <Text style={this.props.items.completed ? styles.nameComplete : styles.name} >{ this.props.items.name }</Text>
                </View>
            </TouchableNativeFeedback>

            <View style={styles.icons}>
                <TouchableNativeFeedback 
                  onPress={this.toggleCompleted} 
                  background={TouchableNativeFeedback.Ripple('#ffecb3', true)}
                  useForeground={true}
                >
                    <View>
                        <Text>{ checkIcon }</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>//entire row
      )//return
    }//else
  }//handleRender

  render() {
    return (this.handleRender())
  }//render
}//component

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  rowDelete: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingRight: 10,
    backgroundColor: '#EFEBE9',
    paddingLeft: 10
  },
  name: {
    width: 180,
    fontSize: 25,
    color: '#757575'
  },
  nameComplete: {
    width: 180,
    fontSize: 25,
    color: '#D7CCC8'
  },
  amount: {
    fontSize: 25
  },
  icons: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingRight: 10
  },
  edName: {
    borderColor: '#ddd', 
    borderWidth: 1
  },
  edInputField: {margin: 0, padding: 0, width: 190, marginLeft: 3},
  edAmount: {fontSize: 20},
  edIcons: {paddingRight: 10 }
})