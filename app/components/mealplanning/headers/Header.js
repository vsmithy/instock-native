import React, {Component, PropTypes} from 'react'
import { View, Dimensions, TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class Header extends Component {
  
  static propTypes = {
    // sortInvName: PropTypes.func.isRequired,
    // sortInvAmount: PropTypes.func.isRequired,
  }//proptypes

  render(){
    return (
      <View style={styles.headerBar}>
        <TouchableHighlight onPress={() => console.log('Month view has been pressed.')} style={ styles.headerTextMonth }  activeOpacity={0.3} underlayColor='#d7ccc8'>
          <Text style={styles.headerText}>Month</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => console.log('Week View has been selected.')} style={ styles.headerTextWeek } activeOpacity={0.3} underlayColor='#d7ccc8'>
          <Text style={styles.headerText}>Week</Text>
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
    height: 40,
    paddingLeft: 20,
    borderBottomColor: '#ddd',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    width: width,
    backgroundColor: '#fff',
    marginBottom: 15
  },
  headerText: { 
    fontSize: 25, 
    color: '#616161'
  },
  headerTextWeek: { width: 0.3*(width-10) },
  headerTextMonth: { width: 0.3*(width-10) }
})//styles
