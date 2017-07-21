import React, { PropTypes, Component } from 'react'
import {View, Text, Dimensions, TouchableHighlight, Button, StyleSheet, Animated} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../actions/constants'

export default class Footer extends Component {
  constructor(props){
    super(props)

    const { width } = Dimensions.get('screen')

    this.state = ({
      animatedXValue: new Animated.Value(0),
      slideDown: new Animated.Value(0),
      bkg: 'rgba(0,0,0,.7)'
    })//state
  }//constructor

  static propTypes = {
    handleFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    clearCompleted: PropTypes.func.isRequired,
  }//propTypes

  handleCompleted(){
    if(this.props.filter !== SHOW_ALL){
      this.callXToast()
      this.slideDown()
      this.props.handleFilter(SHOW_ALL)
    } else {
      this.callXToast()
      this.slideDown()
    }//else
  }//handle completed

  callXToast(){
    Animated.timing(
      this.state.animatedXValue,
      {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      }
    ).start(this.closeXToast('start'))
  }//call X-Translating Toast

  closeXToast(cmd){
    let closer = Animated.timing(
        this.state.animatedXValue,
        {
          toValue: 0,
          duration: 350,
          useNativeDriver: true
        }
      )

    if(cmd === 'start'){
    setTimeout(() => {
      closer.start(() => this.props.clearCompleted())
    }, 3000)
  } else {
      closer.start(() => this.props.clearCompleted())
    }
  }//call X-Translating Toast

  slideDown(){
    Animated.timing(
      this.state.slideDown,
      {
        toValue:1,
        duration: 350,
        useNativeDriver: true
      }
    ).start()
  }//slideDown

  handleTouchCloseEarly(items){
    this.closeXToast('stop')
    this.setState({ bkg: '#b2dfdb' })
    this.props.replenish(items)
  }

  render() {
    const { handleFilter, filter, clearCompleted, shopping } = this.props
    const { width, height } = Dimensions.get('screen')

    let slideFromLeftAnimation = this.state.animatedXValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-width, -100, 0]
    })

    let slideDownAnim = this.state.slideDown.interpolate({
      inputRange: [0,.5,1],
      outputRange: [0,15,60]
    })

    let items = shopping.filter(item => item.completed === true)
    let itemArray = []
    for(let i=0; i < items.length; i++){
      itemArray[i] = items[i].name
    }//for

    return (
      <View>
        <Animated.View style={{ 
          height: 80, 
          marginTop: 0,  
          width: width, 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'absolute',
          bottom: 120,
          transform: [{ translateX: slideFromLeftAnimation }] }} >
              <View style={{ 
                  flexDirection: 'row', 
                  backgroundColor: this.state.bkg, 
                  height: 60, 
                  marginTop: 0,  
                  width: width, 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: 10,
              }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>Also replenish inventory?</Text>
                <Button title='Yes' onPress={() => this.handleTouchCloseEarly(itemArray)} color='#80cbc4' />
              </View>
        </Animated.View>

      <Animated.View style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: 50,
          width: width,
          borderStyle: 'solid',
          borderTopColor: '#ddd',
          borderRightColor: 'rgba(0,0,0,0)',
          borderBottomWidth: 0,
          borderTopWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          transform: [{ translateY: slideDownAnim }]
      }}>
        <View style={styles.filterGroup}>
          <TouchableHighlight onPress={() => handleFilter(SHOW_ALL)}   activeOpacity={0.3} underlayColor='#e0f2f1' style={{height: 40, justifyContent:'center', alignItems:'center'}} >
            <Text style={filter === SHOW_ALL ? styles.textActive : styles.text}>All</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => handleFilter(SHOW_ACTIVE)} style={styles.filter} activeOpacity={0.3} underlayColor='#e0f2f1'><Text style={filter === SHOW_ACTIVE ? styles.textActive : styles.text}>Active</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => handleFilter(SHOW_COMPLETED)} style={styles.filter} activeOpacity={0.3} underlayColor='#e0f2f1'><Text style={filter === SHOW_COMPLETED ? styles.textActive : styles.text}>Completed</Text></TouchableHighlight>
        </View>
        <View style={styles.clearButton} ><Button onPress={this.handleCompleted.bind(this)} color='#80cbc4' title='clear' /></View>
      </Animated.View>
      </View>
    )//return
  }//render
}//component

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  filterGroup: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  textActive: {fontSize: 20, color: '#616161'},
  text: {fontSize: 20, color: '#ddd'},
  filter: {marginLeft: 10, height: 40, justifyContent:'center', alignItems:'center'},
  clearButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  }
})