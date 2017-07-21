import React, { Component } from 'react'
import { View, BackHandler, ListView, TouchableHighlight, Text, Dimensions, Image, StyleSheet, ScrollView, Button, RefreshControl, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

//the locals
import * as actionCreators from '../../actions'


class ResultsList extends Component {
  constructor(props){
    super(props)

    let whichData
    if(this.props.persistedSettings.chosenRecipeSearch === 'dinnerData'){
        whichData = this.props.dinnerData
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'dessertData'){
        whichData = this.props.dessertData
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'lunchData'){
        whichData = this.props.lunchData
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'breakfastData'){ 
        whichData = this.props.breakfastData 
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'instockSearchData'){ 
        whichData = this.props.instockSearchData 
      } else { whichData = this.props.favData  }
      

    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    this.subscription
    this.state = {  
      searching: false,
      whichData: whichData,
      dataSource: ds.cloneWithRows(whichData)
    }//state
  }//constructor

  static navigationOptions = {
    title: 'Results',
    header: null,
  }//nav options

  //Life Cycle Methods
  componentWillMount() {
    console.log('ResultsList will mount')
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('back button pressed')
      console.log('the state is: ' + this.props.navigation.state.routeName +  ' ' + this.props.navigation.state.key)
      this.props.navigation.goBack()
      return true
    })
  }//will mount

  componentWillUnmount() {
    console.log('ResultsList will UNmount')
    this.subscription.remove()
  }// will unmount

  handlePress(item){
    if(this.props.persistedSettings.chosenRecipeSearch === 'instockSearchData'){
      this.setState({ searching: true })
      //fethc and then...
      this.props.getSingleRecipe(item.id).then(() => {
        this.props.updateDetailRecipe(this.props.singleRecipeData[0].id, this.props.singleRecipeData[0].title, this.props.singleRecipeData[0].readyInMinutes, this.props.singleRecipeData[0].image, this.props.singleRecipeData[0].extendedIngredients, this.props.singleRecipeData[0].analyzedInstructions)
        this.setState({ searching: false })
        this.props.navigation.dispatch({ type: 'Details' })
      })
    } else {
      //dispatch action
      this.props.updateDetailRecipe(item.id, item.title, item.readyInMinutes, item.image, item.extendedIngredients, item.analyzedInstructions)

      //navigate
      this.props.navigation.dispatch({ type: 'Details' })
    }//else
  }//handlePress

  handleSearchedFlag(){
    this.props.updateSearchedFlag(
      this.props.persistedSettings.mealFilter, 
      this.props.persistedSettings.chosenDate, 
      this.props.persistedSettings.chosenRecipeSearch, 
      this.props.persistedSettings.chosenRecipeSearch === 'breakfastData' ? true : this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.chosenRecipeSearch === 'lunchData' ? true : this.props.persistedSettings.newSearchLunch,
      this.props.persistedSettings.chosenRecipeSearch === 'dinnerData' ? true : this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.chosenRecipeSearch === 'dessertData' ? true : this.props.persistedSettings.newSearchDessert,
    )
    // console.log('end of list reached...')
  }//handleSearchedFlag

  onRefresh(){
    let category
    let whichData

    if(this.props.persistedSettings.chosenRecipeSearch !== 'favData' && this.props.persistedSettings.chosenRecipeSearch !== 'instockSearchData'){
      //set the category
      if(this.props.persistedSettings.chosenRecipeSearch === 'breakfastData'){ category = 'breakfast'}
      else if(this.props.persistedSettings.chosenRecipeSearch === 'lunchData'){ category = 'lunch'}
      else if(this.props.persistedSettings.chosenRecipeSearch === 'dinnerData'){ category = 'dinner'}
      else{ category = 'dessert'}
      
      //set the proper dataSet
      if(this.props.persistedSettings.chosenRecipeSearch === 'dinnerData'){
        whichData = this.props.dinnerData
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'dessertData'){
        whichData = this.props.dessertData
      } else if(this.props.persistedSettings.chosenRecipeSearch === 'lunchData'){
        whichData = this.props.lunchData
      } else { whichData = this.props.breakfastData }

      this.setState({ searching: true })
      this.props.getRecipes(category)
        .then(() => {
            let updatedData
            if(this.props.persistedSettings.chosenRecipeSearch === 'dinnerData'){
                updatedData = this.props.dinnerData
              } else if(this.props.persistedSettings.chosenRecipeSearch === 'dessertData'){
                updatedData = this.props.dessertData
              } else if(this.props.persistedSettings.chosenRecipeSearch === 'lunchData'){
                updatedData = this.props.lunchData
              } else if(this.props.persistedSettings.chosenRecipeSearch === 'breakfastData'){ 
                updatedData = this.props.breakfastData 
              } else if(this.props.persistedSettings.chosenRecipeSearch === 'instockSearchData'){ 
                updatedData = this.props.instockSearchData 
              } else { updatedData = this.props.favData  }

            this.setState({ dataSource: this.state.dataSource.cloneWithRows(updatedData) })
            this.setState({ searching: false })
        })
    }//end if
  }//onRefresh

  render() {
    const { width } = Dimensions.get('screen')
    let resultHeader
    if(this.props.persistedSettings.chosenRecipeSearch === 'dinnerData'){
      resultHeader = 'Dinner'
    } else if(this.props.persistedSettings.chosenRecipeSearch === 'dessertData'){
      resultHeader = 'Dessert'
    } else if(this.props.persistedSettings.chosenRecipeSearch === 'lunchData'){
      resultHeader = 'Lunch'
    } else if(this.props.persistedSettings.chosenRecipeSearch === 'favData'){
      resultHeader = 'Favorites'
    } else if(this.props.persistedSettings.chosenRecipeSearch === 'breakfastData'){
      resultHeader = 'Breakfast'
    } else {
      resultHeader = "InStock"
    }

    if(this.state.searching){
      return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', backgroundColor: '#fff', marginTop:30 }} ><ActivityIndicator animating={this.state.searching} color='#b2dfdb' size='large' /></View>
    } else if(this.props.persistedSettings.chosenRecipeSearch === 'favData' && this.props.favData.length === 0){ 
        return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', padding: 15 }} ><Text style={{ color: '#999', fontSize: 20}} >hmmmm...looks like no favorites added yet</Text></View> 
    } else if(this.state.whichData.length === 0){
        return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', padding: 15 }} ><Text style={{ color: '#999', fontSize: 20}} >not many things you can make with those ingredients...</Text></View> 
    } else{
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', width: width }} >


          <View style={styles.headerBar}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()}  style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#efebe9'>
              <MaterialIcons name='arrow-back' size={28} color='#616161' />
            </TouchableHighlight>
            <Text style={ styles.dateBarTitle }>{resultHeader}</Text>
          </View>

          <ListView 
            dataSource={this.state.dataSource}
            renderRow={(item) => 
                <TouchableHighlight onPress={() => this.handlePress(item) } style={{width: width, height: 400, flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5}} >
                  <View style={{ width: width, flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Image opacity={1} source={{uri: item.image}} style={{width: width, flex: 1}} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.7)' ,position:'absolute', width: width, height: 75,marginTop: 15, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <Text ellipsizeMode='tail' numberOfLines={2} style={{ color: '#fff', fontSize: 25, marginLeft: 15, paddingBottom: 3 }} >{item.title}</Text>
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center', height: 60, position:'absolute', marginTop: 300, right: 50 }} >
                      <MaterialIcons name='favorite' size={60} color={this.props.favData.findIndex((favItem) => favItem.id === item.id) === -1 ? 'rgba(0,0,0,0)' : '#c62828'} />
                    </View>
                  </View>
                </TouchableHighlight>
            }
            initialListSize={5}
            pageSize={10}
            enableEmptySections={true}
            onEndReached={() => this.handleSearchedFlag()}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.searching}
                onRefresh={this.onRefresh.bind(this)}
                colors={['#00897b']}
                enabled={true}
                progressBackgroundColor='#fff'
              />
            }
            />
        </View>
      )//return
    }//end if-else
  }//render
}//component

const mapStateToProps = state => ({
  dessertData: state.dessertData,
  dinnerData: state.dinnerData,
  lunchData: state.lunchData,
  breakfastData: state.breakfastData,
  chosenDetailItem: state.chosenDetailItem,
  persistedSettings: state.persistedSettings,
  favData: state.favData,
  instockSearchData: state.instockSearchData,
  singleRecipeData: state.singleRecipeData,
})//map state to props

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch)
}//map dispatch to props

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    paddingLeft: 20,
    width: width,
    backgroundColor: '#fff',
    marginTop: 30
  },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarLeft: {width: 0.2*(width-20), marginRight: 0.1*(width-20)},
})


export default connect(mapStateToProps, mapDispatchToProps)(ResultsList)