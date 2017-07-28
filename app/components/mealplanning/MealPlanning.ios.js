import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableHighlight, Dimensions, Button, AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import Calendar from 'react-native-calendar'

//the locals
import DayView from './DayView'
import WeekView from './WeekView'
import { refDates } from '../../helpfulFiles/customItems'
import * as actionCreators from '../../actions'

class MealPlanning extends Component {
  constructor(props){
    super(props)

    this.renderView = this.renderView.bind(this)
    this.handleViewSelect = this.handleViewSelect.bind(this)

    this.state = {
      viewSelect: 'month',
      chosenDate: this.props.persistedSettings.chosenDate,
      stringDate: '2017-04-24'
    }//state
  }//constructor


  //Life Cycle Methods
  componentWillMount() {
    this.setState({ stringDate: (refDates(this.props.persistedSettings.chosenDate)).calMonth })
  }

  componentDidMount() {
    console.log('Meal Planning did mount')
    this.initialSetup()
  }

  async componentDidUpdate(prevProps, prevState) {
    let myStringAry = JSON.stringify(this.props.mealPlanning)
    try {
      await AsyncStorage.setItem('mealPlanning', myStringAry)
    } catch(error){
      console.log(error)
    }//catch
  }//componentDidUpdate

  static navigationOptions = {
    title: 'Meal Planning',
    header: null,
  }//nav options

  onDateSelect(date){
    this.props.updateDateMeal(
      'Breakfast', 
      date, 
      this.props.persistedSettings.whichSearch,
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert,
    )
    this.setState({ viewSelect: 'day'})
  }//onDateSelect

  handleViewSelect(choice){
    this.setState({ viewSelect: choice })
  }//handleViewSelect


  async initialSetup(){
    //fetching data for initial state
      let initialState
      try{
        const initialData = await AsyncStorage.getItem('mealPlanning')
        const parsedInitialData = JSON.parse(initialData)
        if(parsedInitialData === null || parsedInitialData.length === 0){
          initialState = [
            {
              date: 479109600000,
              stringDate: '1985-03-08',
              mealTime: 'Breakfast',
              mealOrder: 1,
              isLinked: false,
              isFavorite: false,
              recipeName: 'Birthday French Toast',
              recipeImage: '',
              recipeIngredients: [],
              recipeDirections: '',
              recipeLink: '',
              recipeApiId: null,
              readyInMinutes: null,
              notes: '',
              id: 0,
              key: 0
            }
          ]
        } else { initialState = parsedInitialData }
      }catch(error){
        console.log('ummm meal error: ' + error)
      }

      this.props.setInitialMealData(initialState)
  }

  renderView(){
    const stringEventList = duplicateStringRemover(this.props.mealPlanning)
    const calStyles =  {
      customStyle: {
        day: {fontSize: 17, textAlign: 'center', color: '#616161'},
        dayButton: {backgroundColor: '#fff'},
        eventIndicator: {backgroundColor: '#b2dfdb', width: 10, height: 10},
        calendarContainer: {backgroundColor: '#fff', flex: 1},
        monthContainer: {backgroundColor: '#fff'},
        calendarControls: {backgroundColor: '#fff', height: 50},
        title: {color: '#616161', fontSize: 22},
        controlButtonText: {color: '#616161', fontSize: 22},
        calendarHeading: {backgroundColor: '#fff'},
        weekendDayText: {color: '#616161'},
        weekendHeading: {color: '#616161'},
        weekendDayButton: {backgroundColor: '#fff'},
      }//customStyle
    }//calStyles
    if(this.state.viewSelect === 'week'){
        return(
          <WeekView {...this.props} handleViewSelect={this.handleViewSelect} />
        )//return
    } else if(this.state.viewSelect === 'day'){
        return(
          <DayView {...this.props} />
        )//return
    } else {
        return(
          <Calendar
            eventDates={stringEventList}
            customStyle={calStyles.customStyle} // Customize any pre-defined styles
            currentMonth={this.state.stringDate}
            onDateSelect={(date) => this.onDateSelect(date)}
            prevButtonText={'Prev'}
            nextButtonText={'Next'}
            weekStart={0}
            startDate={this.state.stringDate}   
            showControls
            showEventIndicators
          />
        )//return
    }//if-else
  }//renderView

  render(){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    return(
      <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1,backgroundColor: '#fff' }}>

        <View style={styles.headerBar}>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'month', stringDate: referenceDates.calMonth })} style={ styles.headerTextWeek }   activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'month' ? {color: '#616161', fontSize: 25} : {color: '#d7ccc8', fontSize: 25} }>Month</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'week'})} style={ styles.headerTextMonth } activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'week' ? {color: '#616161', fontSize: 25} : {color: '#d7ccc8', fontSize: 25} }>Week</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ viewSelect: 'day'})} style={ styles.headerTextMonth } activeOpacity={0.3} underlayColor='#efebe9'>
            <Text style={ this.state.viewSelect === 'day' ? {color: '#616161', fontSize: 25} : {color: '#d7ccc8', fontSize: 25} }>Day</Text>
          </TouchableHighlight>
        </View>

        {this.renderView()}
      </View>
    )//return
  }//render
}//MealPlanning

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
    height: 40,
    paddingLeft: 20,
    width: width,
    backgroundColor: '#fff',
    marginBottom: 5,
    marginTop: 30,
    borderBottomColor: '#d7ccc8',
    borderTopColor: '#d7ccc8',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  headerText: { 
    fontSize: 25, 
    color: '#616161'
  },
  headerTextWeek: { width: 0.3*(width-10) },
  headerTextMonth: { width: 0.3*(width-10) },
})//styles

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanning)