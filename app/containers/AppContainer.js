import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, TabNavigator, TabBarBottom } from 'react-navigation'

//tha locals...
import InventoryContainer from './InventoryContainer'
import ShoppingContainer from './ShoppingContainer'
import RecipesContainer from './RecipesContainer'
import MealNavigation from './MealNavigation'

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: { 
      backgroundColor: '#fff',  
      borderStyle: 'solid',
      borderTopColor: '#d7ccc8',
      borderRightColor: 'rgba(0,0,0,0)',
      borderBottomWidth: 0,
      borderTopWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    activeTintColor: '#80cbc4',
    inactiveTintColor: '#d7ccc8',
    activeBackgroundColor: '#00897b',
    inactiveBackgroundColor: '#b2dfdb',
    showLabel: false,
    showIcon: true,
    indicatorStyle: { backgroundColor: '#80cbc4' },
    iconStyle: {
      width: 32,
      height: 32
    }
  },//tabBarOptions
}//tab Navigator Config

export const AppNavigator = TabNavigator({
  Inventory: { screen: InventoryContainer },
  Shopping: { screen: ShoppingContainer },
  MealPlanning: { screen: MealNavigation },
  Recipes: { screen: RecipesContainer }
}, TabNavigatorConfig)//appNavigator

class AppContainer extends Component { 
  render(){
    return(
      <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
    )//return
  }//render
}//AppContainer

AppContainer.proptypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}//proptypes

const mapStateToProps = state => ({
  nav: state.nav
})//mapstatetoprops

export default connect(mapStateToProps)(AppContainer)