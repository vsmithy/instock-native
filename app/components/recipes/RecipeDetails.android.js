import React, { Component } from 'react'
import { View, BackHandler, TouchableHighlight, Image, Text, Dimensions, Button, StyleSheet, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'

//the locals
import * as actionCreators from '../../actions'
import DetailIngredient from './DetailIngredient'
import { duplicateRemover } from '../../helpfulFiles/customItems'
import { refItemsToAdd, refItems } from '../../helpfulFiles/refIngredients'

class RecipeDetails extends Component {
  constructor(props){
    super(props)

    this.subscription
    this.state = {
      colorVar: '#000'
    }//state
  }//constructor

  static navigationOptions = {
    title: 'Details',
    header: null,
  }//nav options

  //Life Cycle Methods
  componentWillMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('back button pressed')
      console.log('DETAIL - the state is: ' + this.props.navigation.state.routeName +  ' ' + this.props.navigation.state.key)
      if(this.props.navigation.state.routeName === 'Details'){ 
        this.props.navigation.goBack()
        return true
      } else { return false }
    })
  }//will mount

  componentWillUnmount() {
    this.subscription.remove()
  }// will unmount

  handleFav(favStatus){
    const item = this.props.chosenDetailItem[0]
    if(favStatus === -1){
      this.props.addFav(item.id, item.title, item.image, item.readyInMinutes, item.extendedIngredients, item.analyzedInstructions)
    } else {
      this.props.removeFav(item.id)
    }
  }//handleFav


  render() {
    const { width } = Dimensions.get('screen')
    const item = this.props.chosenDetailItem[0]
    const { colorVar } = this.state
    let favStatus = this.props.favData.findIndex((favItem) => favItem.id === item.id )
    let invList = this.props.inventory.filter(item => item.amount !== 'none').map(item => item.name.toLowerCase())
    let ingredientColorList = []
    let inventoryForRecipes = [...invList]


    // for each item in invList _ if it is in refItems, then inventoryForRecipes.concat(refItemsToAdd[idx])
    // was going to do a binary search here, but the list is so small it doesnt matter. if my list ever approaches 100 items, i'll change to a better algorithm
    for(let i=0;i<invList.length;i++){
      let itemIdx = refItems.findIndex(item => item === invList[i])

      if(itemIdx > -1){
        inventoryForRecipes = inventoryForRecipes.concat(refItemsToAdd[itemIdx])
      }//if
    }//for

    //remove string duplicates from ingredients list (ing list)
    let ingList = item.extendedIngredients.map(item => item.name.toLowerCase())
    let filteredList = duplicateRemover(ingList)

    let missingItems = filteredList.reduce(function(numMissing, nextValue){
      //loop over each of the inv items and compare to the current ingredient
      let isFound = inventoryForRecipes.findIndex(invItem => invItem === nextValue)

      //if the ingredient is not in our inventory, then we want to increase the num of missing items
      if(isFound === -1){
        ingredientColorList.push(nextValue)
        return numMissing + 1
      } else {
        return numMissing + 0
      }
    }, 0)//number of missing items

    const numIngredients = item.extendedIngredients.length

    return (
      <ScrollView style={{width: width, flex: 1, backgroundColor: '#fff'}}><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', width: width }}>

        <View style={{width: width, height: 400, flex: 1, alignItems: 'center', justifyContent: 'flex-start'}} >
            <View style={{flexDirection: 'row', height: 70, width: width, backgroundColor: '#fff', padding: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
              <TouchableHighlight onPress={() => this.props.navigation.goBack()}  style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#efebe9'>
                <MaterialIcons name='arrow-back' size={28} color='#616161' />
              </TouchableHighlight>
              <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: '#616161', fontSize: 20, marginLeft: 15, flex: 1 }} >{item.title}</Text>
            </View>

            <Image source={{uri: item.image}} style={{width: width, flex: 1}} />

            <TouchableHighlight style={{ alignItems:'center', justifyContent:'center', height: 60, position:'absolute', marginTop: 300, right: 50, borderRadius: 50, opacity: .75 }} onPress={() => this.handleFav(favStatus)} activeOpacity={0.3} underlayColor='#616161' >
              <MaterialIcons name='favorite' size={60} color={favStatus === -1 ? '#fff' : '#c62828'} />
            </TouchableHighlight>
        </View>

        <View style={{marginTop: 0, width: width, justifyContent: 'center', alignItems: 'flex-start'}}>

          <View style={{width: width, backgroundColor: '#efebe9', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 5}}>
            <View style={{height: 80, alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{fontSize: 40}}>{item.readyInMinutes}</Text>
              <Text style={{fontSize: 15}}>minutes</Text>
            </View>
            <View style={{height: 80, alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{fontSize: 40}}>{numIngredients}</Text>
              <Text style={{fontSize: 15}}>ingredients</Text>
            </View>
            <View style={{height: 80, alignItems: 'center', justifyContent: 'center', flex: 1}}>
              {missingItems > 0 ? 
                <Text style={{fontSize: 40, color:'#c62828'}}>{missingItems}</Text> : 
                <MaterialIcons name='check' size={40} color='#00897b' />
              }
              <Text style={{fontSize: 15, textAlign: 'center'}}>{missingItems > 0 ? 'not inStock' : 'all items inStock'}</Text>
            </View>
          </View>

          <Text style={{marginTop: 20, fontSize: 30, marginLeft: 10, color: '#616161'}}>Ingredients</Text>
            {
              Object
                .keys(item.extendedIngredients)
                .map(key => ingredientColorList.findIndex(toColorItem => item.extendedIngredients[key].name === toColorItem) > -1 ? 
                      <DetailIngredient 
                        key={key} 
                        itemKey={key} 
                        itemName={item.extendedIngredients[key].name} 
                        itemOrigString={item.extendedIngredients[key].originalString} 
                        addShopItem={this.props.addShopItem}
                      />  :
                      <Text key={key} style={{marginTop: 15, fontSize: 20, marginLeft: 30, marginRight: 10, color: '#00897b' } }>
                        {item.extendedIngredients[key].originalString}
                      </Text>
                  )
            }

          <Text style={{marginTop: 20, fontSize: 30, marginLeft: 10, color: '#616161'}}>Directions</Text>
            {
              Object
                .keys(item.analyzedInstructions[0].steps)
                .map(key => <Text key={key} style={{marginTop: 8, fontSize: 20, marginLeft: 30, marginRight: 10, marginBottom: 20, color: '#616161'}}>{item.analyzedInstructions[0].steps[key].number} - {item.analyzedInstructions[0].steps[key].step}</Text>)
            }
        </View>
      </View></ScrollView>
    )//return
  }//render
}//component


const mapStateToProps = state => ({
  chosenDetailItem: state.chosenDetailItem,
  inventory: state.inventory,
  shopping: state.shopping,
  favData: state.favData,
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
  },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarLeft: {width: 30},
})


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)