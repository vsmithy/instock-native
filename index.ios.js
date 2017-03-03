import React, { Component } from 'react'
import { AppRegistry, View, Navigator } from 'react-native'
import * as firebase from 'firebase'

import Inventory from './app/components/inventory/Inventory'
import ShoppingList from './app/components/shoppinglist/ShoppingList'

const firebaseConfig = {
  apiKey: "add your api key here",
  authDomain: "add your domain here",
  databaseURL: "add your db url here"
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
// const itemsRef = firebaseApp.database().ref("Shopping/items")

export default class instock extends Component {
  constructor(){
    super()
    this.itemsRef = firebaseApp.database().ref("Shopping/items")

    this.renderScene = this.renderScene.bind(this)
    this.handleMode = this.handleMode.bind(this)
    this.handleItemPassing = this.handleItemPassing.bind(this)

    this.state = ({
      isDeleting: false
    })//state
  }//constructor

  handleMode(){
    currMode = this.state.isDeleting
    newMode = !currMode
    this.setState({ isDeleting: newMode })
  }//handleMode

  handleItemPassing(name){
    //here we pass an item from inventory to shopping list.
      this.itemsRef.push({ name, isEditing: false, isDeleting: false, completed: false })
  }//handleItemPassing  

  renderScene(route, navigator){
    switch(route.pg){
      case 'Inventory':
        return(<Inventory 
        navigator={navigator} 
        title="inventory" 
        firebaseApp={firebaseApp} 
        deleteMode={this.state.isDeleting} 
        itempassing={this.handleItemPassing} 
        modeChange={this.handleMode}
        />)
      case 'ShoppingList':
        return(<ShoppingList 
        navigator={navigator} 
        title="shoppinglist"  
        firebaseApp={firebaseApp} 
        deleteMode={this.state.isDeleting} 
        modeChange={this.handleMode}
        />)
    }
  }

  render() {
    return (
      <Navigator 
        initialRoute={{ pg: 'Inventory'}}
        renderScene={ this.renderScene }
        configureScreen={ (route, routeStack) => Navigator.SceneConfigs.FloatFromRight() }
      />
    )//return
  }//render
}

AppRegistry.registerComponent('instock', () => instock)