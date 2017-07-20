import React, { Component, PropTypes } from 'react'
import { View, Text, Button, Dimensions } from 'react-native'


export default class Toast extends Component {
  constructor(props){
    super(props)

    this.state = {
      toastOut: false,
      bkg: 'rgba(0,0,0,.5)'
    }//state
  }//constructor

  static propTypes = {
    msg: PropTypes.string.isRequired
  }//proptypes

    render(){
    const { width, height } = Dimensions.get('screen')
    // console.log(height)
    return(
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
        <Text style={{ fontSize: 20, color: '#fff' }}>{this.props.msg}</Text>
        <Button title='Yes' onPress={() => this.setState({ bkg: '#b2dfdb' })} color='#00897b' />
      </View>
    )//return
  }//render
}//component