import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, TabNavigator, TabBarBottom } from 'react-navigation'

//tha locals...
import InventoryContainer from './InventoryContainer'
import ShoppingContainer from './ShoppingContainer'
import RecipesContainer from './RecipesContainer'
import MealNavigation from './MealNavigation'

const TabNavigatorConfig = {
  // tabBarPosition: 'bottom',
  tabBarOptions: {
    style: { 
      backgroundColor: '#B2DFDB',  
      borderStyle: 'solid',
      borderTopColor: '#d7ccc8',
      borderRightColor: 'rgba(0,0,0,0)',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      height: 48,
    },
    activeTintColor: '#555',
    inactiveTintColor: '#555',
    // activeTintColor: '#fff',
    // inactiveTintColor: '#26A69A',
    showLabel: true,
    showIcon: false,
    pressColor: '#E0F2F1',
    indicatorStyle: { backgroundColor: '#795548' },
    iconStyle: {
      width: 32,
      height: 32
    }
  },//tabBarOptions
}//tab Navigator Config

export const AppNavigator = TabNavigator({
  Inventory: { screen: InventoryContainer },
  Shopping: { screen: ShoppingContainer },
  Meals: { screen: MealNavigation },
  Recipes: { screen: RecipesContainer }
}, TabNavigatorConfig)//appNavigator

class AppContainer extends Component { 
  render(){
    return(
        <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
    )//return
  }//render
}//AppContainer

// AppContainer.proptypes = {
//   dispatch: PropTypes.func.isRequired,
//   nav: PropTypes.object.isRequired
// }//proptypes

const mapStateToProps = state => ({
  nav: state.nav
})//mapstatetoprops

export default connect(mapStateToProps)(AppContainer)