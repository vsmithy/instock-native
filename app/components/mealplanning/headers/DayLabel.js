import React, {Component, PropTypes} from 'react'
import { View, Dimensions, TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class DayLabel extends Component {
  
  static propTypes = {
    // sortInvName: PropTypes.func.isRequired,
    // sortInvAmount: PropTypes.func.isRequired,
  }//proptypes

  render(){
    return (
      <View style={styles.headerBar}>
        <TouchableHighlight onPress={() => console.log('go to prev day')} style={ styles.headerTextItem } activeOpacity={0.3} underlayColor='#d7ccc8'>
          <Text style={styles.headerText}>Prev</Text>
        </TouchableHighlight>
        <Text>I am the Date</Text>
        <TouchableHighlight onPress={() => console.log('go to next day')} style={ styles.headerTextAmount }  activeOpacity={0.3} underlayColor='#d7ccc8'>
          <Text style={styles.headerText}>Next</Text>
        </TouchableHighlight>
      </View>
    )//return
  }//render
}//DayLabel

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#efebe9',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: width
  },
  headerText: { 
    fontSize: 25, color: '#616161'
  },
  headerTextItem: { width: 0.2*(width-20) },
  headerTextAmount: { width: 0.2*(width-20) }
})//styles
