//render out the inventory component while passing it the appropriate props...
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MaterialIcons } from '@expo/vector-icons'

//the locals
import Inventory from '../components/inventory/Inventory'
import * as actionCreators from '../actions'


class InventoryContainer extends Component {
  static navigationOptions = {
  tabBarLabel: 'Inventory',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="grid-on" size={32} color={tintColor} />
  )
}//nav options

  render(){
    const checkedCount = this.props.inventory.reduce((count, item) => item.checked ? count+1 : count, 0)

    return(
      <Inventory {...this.props} checkedCount={checkedCount} />
    )//return
  }//render
}//component


const mapStateToProps = state => ({
  inventory: state.inventory,
  shopping: state.shopping
})//map state to props


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}//map dispatch to props

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer)