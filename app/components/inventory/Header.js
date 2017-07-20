import React, {Component, PropTypes} from 'react'
import { View, Dimensions, TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class Header extends Component {
  
  static propTypes = {
    sortInvName: PropTypes.func.isRequired,
    sortInvAmount: PropTypes.func.isRequired,
  }//proptypes

  render(){
    return (
      <View style={styles.headerBar}>
        <TouchableHighlight onPress={() => this.props.sortInvName()} style={ styles.headerTextItem } activeOpacity={0.3} underlayColor='rgba(0,0,0,0)'>
          <Text style={styles.headerText}>Item</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.sortInvAmount()} style={ styles.headerTextAmount }  activeOpacity={0.3} underlayColor='rgba(0,0,0,0)'>
          <Text style={styles.headerText}>Amount</Text>
        </TouchableHighlight>
      </View>
    )//return
  }//render
}//Header

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#efebe9',
    height: 40,
    paddingLeft: 10
  },
  headerText: { 
    fontSize: 25
  },
  headerTextItem: { width: 0.57*(width-10), paddingLeft: 40 },
  headerTextAmount: { width: 0.43*(width-10) }
})//styles
