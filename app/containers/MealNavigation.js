import React, { Component, PropTypes } from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//the locals
import MealPlanning from '../components/mealplanning/MealPlanning'
import MealView from '../components/mealplanning/MealView'
import * as actionCreators from '../actions'


export const MealStack = StackNavigator({
  Home: { screen: MealPlanning },
  Meal: { screen: MealView },
  // Item: { screen: ItemView },
})//MealNavigation


class MealNavigation extends Component { 

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    mealNav: PropTypes.object.isRequired
  }//proptypes

  static navigationOptions = {
    tabBarLabel: 'Meals',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="calendar-range" size={32} color={tintColor} />
    )
  }//nav options

  render(){
    return(
      <MealStack navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.mealNav })}  />
    )//return
  }//render
}//MealNavigation

const mapStateToProps = state => ({
  mealNav: state.mealNav
})//map state to props


export default connect(mapStateToProps)(MealNavigation)