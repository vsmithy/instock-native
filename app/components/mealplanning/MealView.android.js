import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, BackHandler, Button, ScrollView, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

//the locals
import AddButton from './AddButton'
import ListItem from './ListItem'
import InputArea from './InputArea'
import { refDates } from '../../helpfulFiles/customItems'
import * as actionCreators from '../../actions'


class MealView extends Component {
  constructor(props){
    super(props)

    this.subscription
    this.state = {     viewSelect: 'Breakfast'   }
  }//constructor

  static navigationOptions = {
    title: 'Meal View',
    header: null
  }//nav options

  //Life Cycle Methods
  componentWillMount() {
    this.setState({ viewSelect: this.props.persistedSettings.mealFilter })

    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.props.navigation.state.routeName === 'Meal'){ 
        this.props.navigation.goBack()
        return true
      } else { return false }
    })
  }
  componentWillUnmount() {
    this.subscription.remove()
  }

  handleRecipeNav(navigateAction){
    //send action to update some persisted setting
    //this item will be listed as a feature enhancement to come...

    //navigate
    this.props.navigation.dispatch(navigateAction)
  }//handleRecipeNav


  render() {
    let { mealPlanning, persistedSettings, navigation } = this.props
    let chosenDate = persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    let thisMeal = mealPlanning.filter( (item) => referenceDates.chosenDate.getTime() === item.date && item.mealTime === this.state.viewSelect)
    const navigateAction = NavigationActions.navigate({  routeName: 'Recipes' })
    const { width, height } = Dimensions.get('screen')

    return (
      <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1, backgroundColor: '#fff' }}>

        <View style={styles.headerBar}>
          <TouchableHighlight onPress={() => navigation.goBack()}  style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#ddd'>
            <MaterialIcons name='arrow-back' size={28} color='#616161' />
          </TouchableHighlight>
          <Text style={ styles.dateBarTitle }>{referenceDates.stringDayLabel}</Text>
        </View>

        <View style={styles.dateBar}>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'Breakfast' })}   activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'Breakfast' ? {color: '#616161', fontSize: 20} : {color: '#d7ccc8', fontSize: 20} }>Breakfast</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'Lunch'})} activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'Lunch' ? {color: '#616161', fontSize: 20} : {color: '#d7ccc8', fontSize: 20} }>Lunch</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'Snack'})} activeOpacity={0.3} underlayColor='#efebe9' >
            <Text style={ this.state.viewSelect === 'Snack' ? {color: '#616161', fontSize: 20} : {color: '#d7ccc8', fontSize: 20} }>Snack</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'Dinner'})} activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'Dinner' ? {color: '#616161', fontSize: 20} : {color: '#d7ccc8', fontSize: 20} }>Dinner</Text>
          </TouchableHighlight>
        </View>

        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
          <InputArea {...this.props} whichMeal={this.state.viewSelect} />
          <ScrollView>
            { thisMeal.map((item) => <ListItem  key={item.id}  item={item}  {...this.props} />)}
          </ScrollView>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Button title='Browse Recipes' onPress={() => this.handleRecipeNav(navigateAction) } color='#80cbc4'  />
        </View>

      </View>
    )//return
  }//render
}//component

const mapStateToProps = state => ({
  mealPlanning: state.mealPlanning,
  persistedSettings: state.persistedSettings
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
    height: 45,
    paddingLeft: 20,
    width: width,
    backgroundColor: '#fff',
  },
  headerTextWeek: { width: 0.3*(width-10) },
  headerTextMonth: { width: 0.3*(width-10) },
  area: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    height: 50, 
    borderBottomColor: '#d7ccc8',
    borderTopColor: '#d7ccc8',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    width: width
  },
  dateBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    padding: 10,
    borderBottomColor: '#d7ccc8',
    borderRightColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    width: width,
    backgroundColor: '#fff',
    marginBottom: 5
  },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarLeft: {width: 0.2*(width-20), marginRight: 0.1*(width-20)},
})//styles

export default connect(mapStateToProps, mapDispatchToProps)(MealView)