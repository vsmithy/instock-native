import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput, TouchableHighlight, Animated, Dimensions, StyleSheet } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons'

class ListItem extends Component {
  state = { isEditing: false, text: '' }

  // static propTypes = {
  //   item: PropTypes.object.isRequired,
  //   editMealItem: PropTypes.func.isRequired,
  //   deleteMealItem: PropTypes.func.isRequired
  // }//propTypes

  handleEditSave(){
    const { item } = this.props
    const newName = this.state.text

    this.props.editMealItem(newName, item.id)
    this.setState({ isEditing: false })
  }//handleEditSave


  render() {
    const { item } = this.props

    if(this.state.isEditing){
      return(
        <View style={styles.editRow} >
            <View style={styles.editName} >
                <TextInput 
                    onChangeText = { (text) => this.setState({ text }) }
                    ref = 'editInput'
                    style={styles.editInputField}
                    defaultValue = {item.recipeName} 
                    onFocus = {() => this.setState({ text: item.recipeName })}
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
        return (
          <View style={styles.row}>
            <TouchableHighlight
              onPress={() => this.setState({ isEditing: true, text: item.recipeName })}
              style={styles.itemName}
              activeOpacity={0.3} underlayColor='#efebe9'>
                <Text style={styles.itemText} ellipsizeMode='tail' numberOfLines={3}>{item.recipeName}</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.props.deleteMealItem(item.id)}
              style={styles.itemIcon}
              activeOpacity={0.3} underlayColor='#ddd'>
                <Icon name={"delete"} size={32} color='#cf2a27' />
            </TouchableHighlight>
          </View>
        )//return
    }//end if-else
  }//render
}//component

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    width: width,
    alignItems: 'center',
    marginTop: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  itemName: {width: 0.9*(width-20)},
  itemText: { fontSize: 25, color: '#616161' },
  itemIcon: {width: 0.1*(width-20)},


  editRow: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    width: width,
    alignItems: 'center',
    marginTop: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  editName: { borderColor: '#ddd', borderWidth: 1, width: (0.9*(width-20)-2), marginRight: 8 },
  editInputField: {margin: 0, padding: 0, marginLeft: 3, width: (0.9*(width-20))-5, height: 60 },
  editIcon: {width: 0.1*(width-20) }
})//styles

export default ListItem


