import React, { Component, PropTypes } from 'react'
import { View, BackHandler, StyleSheet, TouchableHighlight, Text, Image, Dimensions, ActivityIndicator, Button, AsyncStorage, TextInput  } from 'react-native'
// import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//the locals
import * as actionCreators from '../../actions'
import { myFavRecipe } from '../../helpfulFiles/myFavRecipe'


class Recipes extends Component {
  constructor(props){
    super(props)

    this.subscription
    this.state = { 
      whichView: 'first', 
      searching: false, 
      ingredientsInput: 'carrots',
      text:''
    }//state
  }//constructor

  static navigationOptions = {
    title: 'Recipes',
    header: null,
  }//nav options

  //Life Cycle Methods
  componentWillMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({ whichView: 'first' })
      return true
    })
  }//will mount

  componentDidMount() {
    // console.log('Recipes did mount')
    this.initialSetup()
  }//did mount

  async componentDidUpdate(prevProps, prevState) {
    // console.log('Recipes did update')
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

    //next update persistent settings
    this.props.updateRecipeSearch(whichSearch)//update recipe search


    //next - if we have already searched for stuff and havent reached the end of the list, hit the api for new data
    //whichSettings: determines whether we actually query the api (if true) or just navigate to the results section
    let whichSettings
    if(category === 'breakfast'){ whichSettings = this.props.persistedSettings.newSearchBreakfast }
    else if(category === 'lunch'){ whichSettings = this.props.persistedSettings.newSearchLunch}
    else if(category === 'dinner'){ whichSettings = this.props.persistedSettings.newSearchDinner}
    else if(category === 'dessert'){ whichSettings = this.props.persistedSettings.newSearchDessert}
    else {whichSettings = true}

    if(whichSettings === true && category !== 'fav'){
      /**
      |--------------------------------------------------
      | ok, so now we have determined we need fresh data
      | our steps will be to:
      | -api request
      | -setState searching: false
      | -navigate to the results page
      | -update the persisted settings
      |--------------------------------------------------
      */
      this.props.getRecipes(category).then( () => {
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Results' })
        this.props.updateSearchedFlag(
          category === 'breakfast' ? false : this.props.persistedSettings.newSearchBreakfast, 
          category === 'lunch' ? false : this.props.persistedSettings.newSearchLunch,
          category === 'dinner' ? false : this.props.persistedSettings.newSearchDinner, 
          category === 'dessert' ? false : this.props.persistedSettings.newSearchDessert
        )//updateSearchedFlag
      })//end api req
    } else {
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Results' })
    }//end of if-else
  }//searchpressed


  handleIngredientSearch(){
    this.setState({ searching: true })
    const inventoryListConverted = this.props.inventory.filter(item => item.amount !== 'none').map(item => item.name)
    
    this.props.updateRecipeSearch('instockSearchData')

    this.props.getRecipesByIngredient(inventoryListConverted).then(() => {
      this.setState({ searching: false })
      this.props.navigation.dispatch({ type: 'Results' })
    })
  }//handleIngredientSearch


  handleQueryRecipes(queryString){
    if(queryString === '' || queryString === ' '){
      // console.log('nope nope nope...')
    } else {
      // console.log('searching for ' + queryString)
      this.setState({ searching: true })

      this.props.updateRecipeSearch('queryRecipesData')

      this.props.querySearchRecipes(queryString).then(() => {
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Results' })
      })
    }//if-else
  }//handleQueryRecipes

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

        <View  style={styles.area} >
          <View style={styles.input} >
            <TextInput 
              onChangeText = { (text) => this.setState({ text }) }
              ref = 'addInput'
              placeholder = 'search...' 
              placeholderTextColor = '#d7ccc8'
              returnKeyLabel = 'add'
              selectTextOnFocus= {true}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              blurOnSubmit = {false}
              onSubmitEditing = {() => this.handleQueryRecipes(this.state.text)}
              fontSize = {20}
              includeFontPadding = {false}
              textAlignVertical = 'center'
            />
          </View>
          <View>
            <TouchableHighlight 
                onPress={() => this.handleQueryRecipes(this.state.text)}
                underlayColor="#BCAAA4"
                activeOpacity={0.3}
                underlayColor='rgba(0,0,0,0)'
                style={ styles.icon }
            >
              <Icon name="search" size={32} color='#795548' />
            </TouchableHighlight>
          </View>
        </View>

        <TouchableHighlight onPress={ () => this.searchPressed('fav') } style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/fav.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/3, justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Favorites</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.setState({ whichView: 'browse' })} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/browse.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' ,position:'absolute', width: width, height: height/3, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Browse Categories</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.handleQueryRecipes('autumn')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/soup.jpeg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/3, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Hot & Hearty</Text></View>
          </View>
        </TouchableHighlight>
        </View>
      )//return
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>

        <View style={styles.headerBar}>
          <TouchableHighlight onPress={() => this.setState({ whichView: 'first' })}  style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#efebe9'>
            <Icon name='arrow-back' size={28} color='#616161' />
          </TouchableHighlight>
          <Text style={ styles.dateBarTitle }>Categories</Text>
        </View>
            
        <TouchableHighlight onPress={ () => this.searchPressed('breakfast')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/breakfast.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' ,position:'absolute', width: width, height: height/4, justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Breakfast</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('lunch')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/browse.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' ,position:'absolute', width: width, height: height/4, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Lunch</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('dinner')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/dinner.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' ,position:'absolute', width: width, height: height/4, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Dinner</Text></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.searchPressed('dessert')} style={{width: width, flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
          <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image opacity={.8} source={require('../../../assets/images/dessert.jpg')} style={{width: width, flex: 1}} />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' ,position:'absolute', width: width, height: height/4, justifyContent: 'center'  }}><Text style={{ color: '#fff', fontSize: 35, marginLeft: 15 }} >Dessert</Text></View>
          </View>
        </TouchableHighlight>

        </View>
      )//return
    }//end if-else
  }//render
}//component

const mapStateToProps = state => ({
  persistedSettings: state.persistedSettings,
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
    height: 40,
    paddingLeft: 20,
    width: width,
    backgroundColor: '#F5F5F5',
    // marginBottom: 5
  },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarLeft: {width: 0.2*(width-20), marginRight: 0.1*(width-20)},
  area: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 0,
    borderBottomColor: '#d7ccc8',
    borderTopColor: '#d7ccc8',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    height: 50, 
    width: width,
    backgroundColor:'#f5f5f5'
  },
  input: {
    borderColor: '#ddd', borderWidth: 0, width: 0.9*(width - 20)
  },
  icon: {width: 0.1*(width - 20)} 
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)