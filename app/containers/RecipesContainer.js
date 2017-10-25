import React, { Component, PropTypes } from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
// import { MaterialCommunityIcons } from '@expo/vector-icons'

//the locals
import Recipes from '../components/recipes/Recipes'
import ResultsList from '../components/recipes/ResultsList'
import RecipeDetails from '../components/recipes/RecipeDetails'

export const RecipeStack = StackNavigator({
  Home: { screen: Recipes },
  Results: { screen: ResultsList },
  Details: { screen: RecipeDetails },
})//RecipesContainer


class RecipesContainer extends Component { 

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  //   RecipeNav: PropTypes.object.isRequired
  // }//proptypes

  static navigationOptions = {
    tabBarLabel: 'Recipes',
    // tabBarIcon: ({ tintColor }) => (
    //   <MaterialCommunityIcons name="food" size={32} color={tintColor} />
    // )
  }//navigationOptions

  render(){
    return(
      <RecipeStack navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.RecipeNav })}  />
    )//return
  }//render
}//RecipesContainer

const mapStateToProps = state => ({
  RecipeNav: state.RecipeNav
})//map state to props


export default connect(mapStateToProps)(RecipesContainer)