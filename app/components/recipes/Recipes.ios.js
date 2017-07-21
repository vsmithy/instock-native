import React, { Component, PropTypes } from 'react'
import { View, BackHandler, StyleSheet, TouchableHighlight, Text, Image, Dimensions, ActivityIndicator, Button, AsyncStorage  } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//the locals
import * as actionCreators from '../../actions'
import { myFavRecipe } from '../../helpfulFiles/myFavRecipe'


class Recipes extends Component {
  constructor(props){
    super(props)

    this.subscription
    this.state = { whichView: 'first', searching: false, ingredientsInput: 'carrots' }//state
  }//constructor

  static propTypes = {
  }//propTypes

  static navigationOptions = {
    title: 'Recipes',
    header: null
  }//nav options

  //Life Cycle Methods
  componentWillMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({ whichView: 'first' })
      return true
    })
  }//will mount

  componentDidMount() {
    console.log('Recipes did mount')
    this.initialSetup()
  }//did mount

  async componentDidUpdate(prevProps, prevState) {
    console.log('Recipes did update')
    let myStringAry = JSON.stringify(this.props.favData)
    try {
      await AsyncStorage.setItem('favData', myStringAry)
    } catch(error){
      console.log(error)
    }//catch
  }//did update
  
  searchPressed(category){
    let whichSearch = category + 'Data'
    this.setState({ searching: true })

    this.props.updateRecipeSearch(
      this.props.persistedSettings.mealFilter, 
      this.props.persistedSettings.chosenDate, 
      whichSearch,
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert, 
    )//update recipe search

    let whichSettings
    if(category === 'breakfast'){ whichSettings = this.props.persistedSettings.newSearchBreakfast }
    else if(category === 'lunch'){ whichSettings = this.props.persistedSettings.newSearchLunch}
    else if(category === 'dinner'){ whichSettings = this.props.persistedSettings.newSearchDinner}
    else if(category === 'dessert'){ whichSettings = this.props.persistedSettings.newSearchDessert}
    else {whichSettings = true}

    if(whichSettings === true && category !== 'fav'){
      this.props.getRecipes(category).then( () => {
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Results' })
        this.props.updateSearchedFlag(
          this.props.persistedSettings.mealFilter, 
          this.props.persistedSettings.chosenDate, 
          this.props.persistedSettings.chosenRecipeSearch, 
          category === 'breakfast' ? false : this.props.persistedSettings.newSearchBreakfast, 
          category === 'lunch' ? false : this.props.persistedSettings.newSearchLunch,
          category === 'dinner' ? false : this.props.persistedSettings.newSearchDinner, 
          category === 'dessert' ? false : this.props.persistedSettings.newSearchDessert
        )//updateSearchedFlag
      })//end .then
    } else {
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Results' })
    }//end of if-else
  }//searchpressed


  handleIngredientSearch(){
    this.setState({ searching: true })
    const inventoryListConverted = this.props.inventory.filter(item => item.amount !== 'none').map(item => item.name)
    
    this.props.updateRecipeSearch(
      this.props.persistedSettings.mealFilter, 
      this.props.persistedSettings.chosenDate, 
      'instockSearchData',
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert, 
    )

    this.props.getRecipesByIngredient(inventoryListConverted).then(() => {
      this.setState({ searching: false })
      this.props.navigation.dispatch({ type: 'Results' })
    })
  }//handleIngredientSearch


  async initialSetup(){
    //fetching data for initial state
      let initialState
      try{
        const initialData = await AsyncStorage.getItem('favData')
        const parsedInitialData = JSON.parse(initialData)
        if(parsedInitialData === null || parsedInitialData.length === 0){
          initialState = myFavRecipe
        } else { initialState = parsedInitialData }
      }catch(error){
        console.log('ummm favData error: ' + error)
      }

      this.props.setInitialFavData(initialState)
  }//initial Setup

  render() {
    const { width, height } = Dimensions.get('screen')

    if(this.state.searching){
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
          <ActivityIndicator animating={this.state.searching} color='#b2dfdb' size='large' />
        </View>
      )//return
    } else if(this.state.whichView === 'first'){
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
            
        <TouchableHighlight onPress={ () => this.searchPressed('fav') } style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/fav.jpg')} style={{width: width, height: height/3, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/3-15, justifyContent: 'center', margin: 0, padding: 0, flex: 1 }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Favorites</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.setState({ whichView: 'browse' })} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/browse.jpg')} style={{width: width, height: height/3, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' ,position:'absolute', width: width, height: height/3-15, justifyContent: 'center', margin: 0, padding: 0, flex: 1  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Browse Categories</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.handleIngredientSearch()} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/lunch.jpg')} style={{width: width, height: height/3, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/3-15, justifyContent: 'center', margin: 0, padding: 0, flex: 1  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >What's InStock</Text></View>
          </View>
        </TouchableHighlight>
        </View> 
      )//return
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>

        <View style={styles.headerBar}>
          <TouchableHighlight onPress={() => this.setState({ whichView: 'first' })}  style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#efebe9'>
            <MaterialIcons name='arrow-back' size={28} color='#616161' />
          </TouchableHighlight>
          <Text style={ styles.dateBarTitle }>Categories</Text>
        </View>
            
        <TouchableHighlight onPress={ () => this.searchPressed('breakfast')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/breakfast.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' ,position:'absolute', width: width, height: height/4-28, justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Breakfast</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('lunch')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/browse.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' ,position:'absolute', width: width, height: height/4-28, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Lunch</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('dinner')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/dinner.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/4-28, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Dinner</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('dessert')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/dessert.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' ,position:'absolute', width: width, height: height/4-28, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Dessert</Text></View>
          </View>
        </TouchableHighlight>

        </View>
      )//return
    }//end if-else
  }//render
}//component

const mapStateToProps = state => ({
  recipes: state.recipes,
  persistedSettings: state.persistedSettings,
  mealPlanning: state.mealPlanning,
  breakfastData: state.breakfastData,
  lunchData: state.lunchData,
  dinnerData: state.dinnerData,
  dessertData: state.dessertData,
  favData: state.favData,
  inventory: state.inventory,
})//map state to props

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}//map dispatch to props

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  recipeCategory: {
    backgroundColor: '#ee0'
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    width: width,
    backgroundColor: '#fff',
    marginTop: 30
    // marginBottom: 5
  },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarLeft: {width: 0.2*(width-20), marginRight: 0.1*(width-20)},
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)