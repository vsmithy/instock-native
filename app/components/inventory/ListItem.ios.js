import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TextInput, PickerIOS, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


/*     ***************notes and info about this component***************
  
  we will render each of these components in one of 3 ways depending on whether we are in edit mode , deleteMode , or just regular mode.
  
  Logic:
    The initial view is a FlatList that loads 75 items, and will load more once you get to the bottom.
    onPress => editMode
      - user can submit text with keyboard or with the 'submit' icon and cancel with cancel icon

    onLongPress => deleteMode
      - entering delete mode cancels any editing and editing is not permitted until no longer in delete mode.
      - the InputArea component changes to render a button instead of a TextInput element when entering delete mode
      - once in delete mode, the behaviour of each list item is different:
        - onPress toggle checked  => this.setState({ checked: !item.checked })
        - onPress change styling
*/

export default class ListItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: false,
      text: 'placeholder',
      amt: 'plenty',
      nameVar: 'shopping-cart',
      colorVar: '#616161'
    }//state
  }//constructor

  static propTypes = {
    item: PropTypes.object.isRequired,
    editInvItem: PropTypes.func.isRequired, 
    addShopItem: PropTypes.func.isRequired, 
    checkedCount: PropTypes.number.isRequired, 
    checkForDelete: PropTypes.func.isRequired, 
  }//proptypes


  handleEditSave(){
    const { item } = this.props
    const newName = this.state.text.trim()
    const newAmount = this.state.amt

    this.props.editInvItem(item.id, newName, newAmount)
    this.setState({ isEditing: false })
  }//handleEditSave

  handleAddToShopping(){
    const { item } = this.props
    this.props.addShopItem(item.name)
    this.setState({ nameVar: 'check-circle', colorVar: '#80cbc4'})
    setTimeout(() => this.setState({ nameVar: 'shopping-cart', colorVar: '#616161' }), 1000)
  }//handleAddToShopping

  render(){
    const { item } = this.props
    const { nameVar, colorVar } = this.state

    if(this.props.checkedCount !== 0){
      return (
        <View style={item.checked ? styles.deleteItemRow : styles.row}>
            <Text style={styles.deleteItemName} ellipsizeMode='tail' numberOfLines={2}>{item.name}</Text>
            <Text style={styles.deleteItemAmount}>{item.amount}</Text>
          <TouchableHighlight
            onPress={() => this.props.checkForDelete(item.id)} style={styles.deleteItemIcon}  activeOpacity={0.3} underlayColor='rgba(0,0,0,0)' >
            <MaterialIcons name={item.checked ? "remove-circle" : "radio-button-unchecked"} size={28} color='#cf2a27' />
          </TouchableHighlight>
        </View>
      )//return
    } else if(this.props.checkedCount === 0 && this.state.isEditing){
      return(
        <View style={styles.row} >
            <View style={styles.editItemName} >
                <TextInput 
                    onChangeText = { (text) => this.setState({ text }) }
                    ref = 'editInput'
                    style={styles.editInputField}
                    defaultValue = {item.name} 
                    onFocus = {() => this.setState({ text: item.name, amt: item.amount })}
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

            <PickerIOS 
              ref='editAmount'
              style={styles.editItemAmount}
              selectedValue={this.state.amt}
              onValueChange={(amt) => this.setState({amt})}
              fontSize={20}
              mode='dropdown'
            >
                <PickerIOS.Item label="Plenty" value="plenty" />
                <PickerIOS.Item label="Some" value="some" />
                <PickerIOS.Item label="None" value="none" />
            </PickerIOS>

            <TouchableHighlight 
              onPress={this.handleEditSave.bind(this)} 
              activeOpacity={0.3}
              underlayColor='rgba(0,0,0,0)'
              style={styles.editItemIcon}
            >
                <MaterialIcons name="done" size={28} color='#00897b' />
            </TouchableHighlight>

        </View>//entire row
      )//return
    } else {
      return(
        <View style={styles.row}>
          <TouchableHighlight
            onPress={() => this.setState({ isEditing: true, text: item.name, amt: item.amount })}
            onLongPress={() => this.props.checkForDelete(item.id)}
            activeOpacity={0.3} 
            underlayColor='#efebe9'>
            <Text style={styles.itemName} ellipsizeMode='tail' numberOfLines={2} >{item.name}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({ isEditing: true, text: item.name, amt: item.amount })}
            onLongPress={() => this.props.checkForDelete(item.id)}
            activeOpacity={0.3} 
            underlayColor='#efebe9'>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleAddToShopping.bind(this)} style={styles.itemIcon}
            activeOpacity={0.3} 
            underlayColor='rgba(0,0,0,0)'>
              <MaterialIcons name={nameVar} size={28} color={colorVar} />
          </TouchableHighlight>
        </View>
      )//return
    }//if
  }//render
}//component

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row', 
    flex: 1,
    width: width,
    justifyContent: 'flex-start',
    height: 55,
    alignItems: 'center',
    marginTop: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  itemName: { fontSize: 25, width: 0.62*(width-20), color:'#616161', paddingRight: 8 },
  itemAmount: { fontSize: 25, width: 0.30*(width-20)-5, color:'#616161' },
  itemAmountNone: { fontSize: 25, width: 0.30*(width-20), color: '#cf2a27' },
  itemIcon: { width: 0.08*(width-20)+5 },


  deleteItemRow: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    flex: 1,
    height: 50,
    width: width,
    alignItems: 'center',
    marginTop: 5,
    paddingRight: 10,
    backgroundColor: '#EFEBE9',
    paddingLeft: 10,
    paddingTop: 10
  },
  deleteItemName: { fontSize: 25, width: 0.62*(width-20), color:'#616161', paddingRight: 8 },
  deleteItemAmount: { fontSize: 25, width: 0.30*(width-20), color:'#616161' },
  deleteItemIcon: { width: 0.08*(width-20) },


  editItemName: { fontSize: 25, width: 0.58*(width-20), paddingLeft: 3, paddingRight: 8 },
  editInputField: { width: (0.54*(width-20))-3, alignItems: 'center', height: 40  },
  editItemAmount: { width: (0.30*(width-20)) },
  editItemIcon: { paddingLeft:10 }
})