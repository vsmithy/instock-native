import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, SectionList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


//the locals
import duplicateRemover from '../../helpfulFiles/duplicateRemover'
import duplicateStringRemover from '../../helpfulFiles/duplicateStringRemover'
import { refDates } from '../../helpfulFiles/customItems'


class WeekView extends Component {
  constructor(props){
    super(props)

    this.handleSectionPress = this.handleSectionPress.bind(this)
    this.handleMealPress = this.handleMealPress.bind(this)
  }//constructor

  //Life Cycle Methods
  // componentWillMount() {console.log('WeekView will mount')}
  // componentDidMount() {console.log('WeekView did mount')}
  // componentWillUnmount() {console.log('WeekView will UN mount')}
  // componentWillUpdate() {console.log('WeekView will update')}
  // componentWillReceiveProps(nextProps) {console.log('WeekView will receive props: ')}
  // componentDidUpdate(prevProps, prevState) {console.log('WeekView did update')}

  handlePrevWk(){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    this.props.updateDateMeal(
      'Breakfast', 
      referenceDates.lastWeek, 
      this.props.persistedSettings.whichSearch,
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert,
    )
  }//handlePrevWk

  handleNextWk(){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    this.props.updateDateMeal(
      'Breakfast', 
      referenceDates.nextWeek, 
      this.props.persistedSettings.whichSearch,
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert,
    )
  }//handleNextWk

  handleSectionPress(day){
    let chosenDate = this.props.persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)
    let refYear = referenceDates.startOfWeek.getFullYear()
    let refMonth = referenceDates.startOfWeek.getMonth()
    let refDay = referenceDates.startOfWeek.getDate()
    let selectedSectionDay = refDay+day


    if(day === 0){
      this.props.updateDateMeal(
        'Breakfast', 
        referenceDates.startOfWeek, 
        this.props.persistedSettings.whichSearch,
        this.props.persistedSettings.newSearchBreakfast, 
        this.props.persistedSettings.newSearchLunch, 
        this.props.persistedSettings.newSearchDinner, 
        this.props.persistedSettings.newSearchDessert,
      )
    } else if(day === 6){
      this.props.updateDateMeal(
        'Breakfast', 
        referenceDates.endOfWeek, 
        this.props.persistedSettings.whichSearch,
        this.props.persistedSettings.newSearchBreakfast, 
        this.props.persistedSettings.newSearchLunch, 
        this.props.persistedSettings.newSearchDinner, 
        this.props.persistedSettings.newSearchDessert,
      )
    } else {
      let newDate = new Date(refYear, refMonth, selectedSectionDay)
      this.props.updateDateMeal(
        'Breakfast', 
        newDate, 
        this.props.persistedSettings.whichSearch,
        this.props.persistedSettings.newSearchBreakfast, 
        this.props.persistedSettings.newSearchLunch, 
        this.props.persistedSettings.newSearchDinner, 
        this.props.persistedSettings.newSearchDessert,
      )
    }//if-else block

    this.props.handleViewSelect('day')
  }//handle selection press

  handleMealPress(mealTime, mealDate){
    //pass mealtime and date to persisted settings
    this.props.updateDateMeal(
      mealTime, 
      (new Date(mealDate)), 
      this.props.persistedSettings.whichSearch,
      this.props.persistedSettings.newSearchBreakfast, 
      this.props.persistedSettings.newSearchLunch, 
      this.props.persistedSettings.newSearchDinner, 
      this.props.persistedSettings.newSearchDessert,
    )

    //navigate to the meal screen
    this.props.navigation.dispatch({ type: 'Meal' })
  }//handleMealPress

  render() {
    const { mealPlanning, persistedSettings } = this.props
    const { width } = Dimensions.get('screen')
    let chosenDate = persistedSettings.chosenDate
    let referenceDates = refDates(chosenDate)


    //next is the section where i grab the meals for each day
    const sunMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 0)
    })
    const monMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 1)
    })
    const tuesMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 2)
    })
    const wedMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 3)
    })
    const thurMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 4)
    })
    const friMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 5)
    })
    const satMeals = mealPlanning.filter(function(item){
      const workingDate = new Date(item.date)
      return item.date >= referenceDates.startOfWeek && item.date <= referenceDates.endOfWeek && (workingDate.getDay() === 6)
    })

    const sectionData = [
      { title: 'Sunday',  data: sunMeals, key: 0  },
      { title: 'Monday',  data: monMeals, key: 1  },
      { title: 'Tuesday',  data: tuesMeals, key: 2  },
      { title: 'Wednesday', data: wedMeals, key: 3  },
      { title: 'Thursday',  data: thurMeals, key: 4  },
      { title: 'Friday',  data: friMeals, key: 5  },
      { title: 'Saturday',  data: satMeals, key: 6  }
    ]

    return (
      <View style={{flex: 1, width:width}}>
        <View style={styles.dateBar}>
          <TouchableHighlight onPress={() => this.handlePrevWk()} style={ styles.dateBarLeft }   activeOpacity={0.3} underlayColor='#ddd'>
            <MaterialCommunityIcons name='chevron-left' size={28} color='#616161' />
          </TouchableHighlight>

          <Text style={ styles.dateBarTitle }>{referenceDates.stringWeekRange}</Text>

          <TouchableHighlight onPress={() => this.handleNextWk()} style={ styles.dateBarRight } activeOpacity={0.3} underlayColor='#ddd'>
            <MaterialCommunityIcons name='chevron-right' size={28} color='#616161' style={ styles.dateBarRightText } />
          </TouchableHighlight>
        </View>


        <View style={{flex: 1, paddingTop: 5, width:width}}>
          <SectionList
            sections={sectionData}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => <TouchableHighlight onPress={() => this.handleMealPress(item.mealTime, item.date)} activeOpacity={0.3} underlayColor='#ddd'><Text style={ styles.sectionItems }>{item.mealTime}  -  {item.recipeName}</Text></TouchableHighlight>}
            renderSectionHeader={({section}) => <TouchableHighlight onPress={() => this.handleSectionPress(section.key)} activeOpacity={0.3} underlayColor='#ddd'><Text style={styles.sectionHeaders}>{section.title}</Text></TouchableHighlight>}
          ></SectionList>
        </View>
      </View>
    )//return
  }//render
}//component


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

export default WeekView