import React, {Component, PropTypes} from 'react'
import { View, Dimensions, TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class ItemViewHeader extends Component {
  
  static propTypes = {
    // sortInvName: PropTypes.func.isRequired,
    // sortInvAmount: PropTypes.func.isRequired,
  }//proptypes

  render(){
    return (
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Monday - 5/19/2017</Text>
        <Text style={styles.headerText}>Breakfast</Text>
      </View>
    )//return
  }//render
}//ItemViewHeader

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#efebe9',
    height: 70,
    paddingLeft: 10,
    width: width
  },
  headerText: { 
    fontSize: 25, color: '#616161'
  },
})//styles
