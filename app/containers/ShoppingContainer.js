import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { MaterialIcons } from '@expo/vector-icons'

//the locals
import Shopping from '../components/shopping/Shopping'
import * as actionCreators from '../actions'


class ShoppingContainer extends Component {
  static navigationOptions = {
  tabBarLabel: 'Shopping',
  // tabBarIcon: ({ tintColor }) => (
  //   <MaterialIcons name="shopping-cart" size={32} color={tintColor} />
  // )
}//nav options

  render(){
    const deletingCount = this.props.shopping.reduce((count, item) => item.deleting ? count+1 : count, 0)
    const completedCount = this.props.shopping.reduce((count, item) => item.completed ? count+1 : count, 0)

    return(
      <Shopping {...this.props} deletingCount={deletingCount} completedCount={completedCount} />
    )//return
  }//render
}//component

const mapStateToProps = state => ({
  shopping: state.shopping,
  inventory: state.inventory
})//map state to props

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}//map dispatch to props

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingContainer)