import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class AddButton extends Component {
  constructor(props){
    super(props)

    const { width } = Dimensions.get('screen')
    this.slideLeft = this.slideLeft.bind(this)
    this.state = ({
      // animatedXValue: new Animated.Value(0),
      slideLeft: new Animated.Value(0),
      scaleSize: new Animated.Value(0),
      slideVertical: new Animated.Value(0),
      // bkg: 'rgba(0,0,0,.7)'
    })//state
  }//constructor

  slideLeft(){
    Animated.timing(
      this.state.slideLeft,
      {
        toValue:1,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideLeft

  slideRight(){
    Animated.timing(
      this.state.slideLeft,
      {
        toValue:0,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideRight

  slideUp(){
    Animated.timing(
      this.state.slideVertical,
      {
        toValue:1,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideUp

  slideDown(){
    Animated.timing(
      this.state.slideVertical,
      {
        toValue:0,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//slideDown

  scaleDown(){
    Animated.timing(
      this.state.scaleSize,
      {
        toValue:1,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//scaleDown

  scaleUp(){
    Animated.timing(
      this.state.scaleSize,
      {
        toValue:0,
        duration: 250,
        useNativeDriver: true
      }
    ).start()
  }//scaleUp

  handleToggleAdding(){
    this.props.toggleAdding()
    if(this.props.addingState){
      this.slideRight()
      this.scaleUp()
      this.slideDown()
      this.props.slideInputDown()
      this.props.handleInputHeight('down')
    } else { 
      this.slideLeft() 
      this.scaleDown()
      this.slideUp()
      this.props.slideInputUp()
      this.props.handleInputHeight('up')
    }
  }

  render() {
    const { width } = Dimensions.get('screen')
    const { navigation } = this.props
    let primaryIcon = this.props.addingState ? 'keyboard-arrow-down' : 'add'
    // let primaryIconSize = this.props.addingState ? 16 : 24


    //animations
    let slideAnim = this.state.slideLeft.interpolate({
      inputRange: [0,.5,1],
      outputRange: [0,-(0.8*(width-72)/2),-(width-72)/2]
    })

    let scaleAnim = this.state.scaleSize.interpolate({
      inputRange: [0,.5,1],
      outputRange: [1,.8,.5]
    })

    let slideVert = this.state.slideVertical.interpolate({
      inputRange: [0,.5,1],
      outputRange: [0,-7,-10]
    })


    if(this.props.checkedCount !== 0){
      return (
          <Animated.View 
            style={{ 
              display: 'none',
              backgroundColor: '#B2DFDB', 
              elevation: 2, 
              borderRadius: 50, 
              height: 56, 
              width: 56, 
              position: 'absolute', 
              bottom: 16, 
              right: 16,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ translateX: slideAnim }, { scale: scaleAnim }, { translateY: slideVert }],
            }}
          >
            <TouchableHighlight 
              onPress={ this.handleToggleAdding.bind(this) } 
              style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56, 
                height: 56,
              }} 
            ><Text><Icon name={primaryIcon} size={24} color='#fff' /></Text></TouchableHighlight>
          </Animated.View>
      )//return
    } else {
    return (
        <Animated.View 
          style={{ 
            backgroundColor: '#795548', 
            elevation: 2, 
            borderRadius: 50, 
            height: 56, 
            width: 56, 
            position: 'absolute', 
            bottom: 16, 
            right: 16,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: slideAnim }, { scale: scaleAnim }, { translateY: slideVert }],
          }}
        >
          <TouchableHighlight 
            onPress={ this.handleToggleAdding.bind(this) } 
            activeOpacity = {.7}
            underlayColor = '#8D6E63'
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              width: 56, 
              height: 56,
            }} 
          ><Text><Icon name={primaryIcon} size={24} color='#fff' /></Text></TouchableHighlight>
        </Animated.View>
    )//return
  }//else
  }//render
}//component

export default AddButton

// export default AddButton