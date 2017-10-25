import React, { Component } from 'react'
import { View, TouchableHighlight, Text, Dimensions, StyleSheet, SectionList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//The WindowLocalStorage....
import { refDates } from '../../helpfulFiles/customItems'
import AddButton from './AddButton'

class DayView extends Component {
  constructor(props){
    super(props)

    this.handleSectionPress = this.handleSectionPress.bind(this)
  }//constructor

  //Life Cycle Methods
  // componentWillMount() {console.log('DayView will mount')}
  // componentDidMount() {console.log('DayView did mount')}
  // componentWillUnmount() {console.log('DayView will UN mount')}
  // componentWillUpdate() {console.log('DayView will update')}
  // componentWillReceiveProps(nextProps) {console.log('DayView will receive props: ')}
  // componentDidUpdate(prevProps, prevState) {console.log('DayView did update')}

  handlePrevDy(){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    this.props.updateDateMeal('Breakfast', referenceDates.yesterday)
  }//handlePrevWk

  handleNextDy(){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    this.props.updateDateMeal('Breakfast', referenceDates.tomorrow)
  }//handleNextWk

  handleSectionPress(mealTime){
    //pass mealtime and date to persisted settings
    this.props.updateDateMeal(mealTime, this.props.persistedSettings.chosenDate)

    //navigate to the meal screen
    this.props.navigation.dispatch({ type: 'Meal' })
  }//handle selection press

  render(){
    const { navigation, persistedSettings, mealPlanning } = this.props
    let chosenDay = persistedSettings.chosenDate
    let referenceDates = refDates(chosenDay)

    const chosenMeals = mealPlanning.filter( (item) => referenceDates.chosenDate.getTime() === item.date)
    const breakfastItems = chosenMeals.filter( (item) => item.mealTime === 'Breakfast')
    const lunchItems = chosenMeals.filter( (item) => item.mealTime === 'Lunch')
    const snackItems = chosenMeals.filter( (item) => item.mealTime === 'Snack')
    const dinnerItems = chosenMeals.filter( (item) => item.mealTime === 'Dinner')

    const sectionData = [
      { title: 'Breakfast',  data: breakfastItems, key: 0  },
      { title: 'Lunch',  data: lunchItems, key: 1  },
      { title: 'Snack',  data: snackItems, key: 2  },
      { title: 'Dinner',  data: dinnerItems, key: 3  }
    ]

    return(
      <View style={{flex: 1, width:width}}>

        <View style={styles.dateBar}>
          <TouchableHighlight onPress={() => this.handlePrevDy()} style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#ddd'>
            <Icon name='chevron-left' size={28} color='#616161' />
          </TouchableHighlight>

          <Text style={ styles.dateBarTitle }>{referenceDates.stringDayLabel}</Text>

          <TouchableHighlight onPress={() => this.handleNextDy()} style={ styles.dateBarRight } activeOpacity={0.3} underlayColor='#ddd'>
            <Icon name='chevron-right' size={28} color='#616161' style={ styles.dateBarRightText } />
          </TouchableHighlight>
        </View>


        <View style={{flex: 1, paddingTop: 5, width:width}}>
          <SectionList
            sections={sectionData}
            stickySectionHeadersEnabled={false }
            renderItem={({item}) => <TouchableHighlight onPress={() => this.handleSectionPress(item.mealTime)} activeOpacity={0.3} underlayColor='#ddd'><Text style={ styles.sectionItems }>{item.recipeName}</Text></TouchableHighlight>}
            renderSectionHeader={({section}) => <TouchableHighlight onPress={() => this.handleSectionPress(section.title)} activeOpacity={0.3} underlayColor='#ddd'><Text style={styles.sectionHeaders}>{section.title}</Text></TouchableHighlight>}
          ></SectionList>
        </View>

        <AddButton {...this.props} navChoice='Meal' /> 

      </View>
    )//return
  }//render
}//DayView

const mapStateToProps = state => ({
  mealPlanning: state.mealPlanning,
  persistedSettings: state.persistedSettings
})//map state to props

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
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
  dateBarLeft: {width: 0.2*(width-20)},
  dateBarRight: {width: 0.2*(width-20), },
  dateBarTitle: {
    fontSize: 25, 
    color: '#616161'
  },
  dateBarRightText: {alignSelf: 'flex-end', margin: 0, padding: 0},
  sectionHeaders: {
    padding: 10,
    color: '#616161',
    fontSize: 25,
    marginTop: 15,
  },
  sectionItems: {
    padding: 10,
    color: '#aaa',
    fontSize: 17,
  },
})//styles

export default connect(mapStateToProps)(DayView)