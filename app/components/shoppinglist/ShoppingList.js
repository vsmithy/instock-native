import React, { Component } from 'react'
import { Text, View, ListView, StatusBar } from 'react-native'
import * as firebase from 'firebase'

import Header from './Header'
import SearchArea from './SearchArea'
import Item from './Item'

export default class ShoppingList extends Component {
    constructor(props){
        super(props)

        const firebaseApp = this.props.firebaseApp
        this.itemsRef = firebaseApp.database().ref("Shopping/items")

        this._addItem = this._addItem.bind(this)
        this._renderItem = this._renderItem.bind(this)
        this._removeItem = this._removeItem.bind(this)
        this._editItem = this._editItem.bind(this)
        this._handleEditSave = this._handleEditSave.bind(this)
        this._toggleDeleting = this._toggleDeleting.bind(this)
        this._deleteQuery = this._deleteQuery.bind(this)
        this._toggleCompleted = this._toggleCompleted.bind(this)

        this.state = ({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        })//state
    }//constructor

  _addItem(name){
      this.itemsRef.push({ name, isEditing: false, isDeleting: false, completed: false })
  }//_addItem

  _deleteQuery(){
      let qResult = []
      this.itemsRef.orderByChild("isDeleting").equalTo(true).on("child_added", function(snapshot) {qResult.push(snapshot.key)})
      qResult.map((item) => this.itemsRef.child(item).remove())
  }//_deleteQuery

  componentDidMount(){
      this.listenForItems(this.itemsRef)
  }//did Mount

  listenForItems(itemsRef) {
      // console.log(itemsRef)
      itemsRef.on('value', (snap) => {

      // get children as an array
      let items = []
      snap.forEach((child) => {
          // console.log('the child is ' + child.key)
          items.push({
          name: child.val().name,
          isEditing: child.val().isEditing,
          isDeleting: child.val().isDeleting,
          completed: child.val().completed,
          _key: child.key
          })//push
      })//snap
      // console.log(items)
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
      })//state
      })//itemsRef
  }//listenForItems

  _renderItem(item){
      return(
          <Item items={item} 
              handleRemove={this._removeItem} 
              handleEdit={this._editItem} 
              handleEditSave={this._handleEditSave} 
              deleteMode={this.props.deleteMode} 
              handleToggleDeleting={this._toggleDeleting}
              handleToggleCompleted={this._toggleCompleted}
          />
      )//return
  }//_renderItem

  _toggleDeleting(item){
      ///get current state
      const currDelState = item.isDeleting
      const newDelState = !currDelState

      //change the isDeleting state of item to true
      this.itemsRef.child(item._key).set({
          name: item.name,
          isEditing: item.isEditing,
          isDeleting: newDelState,
          completed: false
      })
  }//_toggleDeleting

  _toggleCompleted(item){
      ///get current state
      const currCompState = item.completed
      const newCompState = !currCompState

      //change the isDeleting state of item to true
      this.itemsRef.child(item._key).set({
          name: item.name,
          isEditing: item.isEditing,
          isDeleting: item.isDeleting,
          completed: newCompState
      })
  }//_toggleCompleted

  _removeItem(item){
      //change the isDeleting state of item to true
      this.itemsRef.child(item._key).set({
          name: item.name,
          isEditing: item.isEditing,
          isDeleting: true,
          completed: false
      })

      this.props.modeChange()
  }//_removeItem

  _handleEditSave(item, newName){
      //edit item
      this.itemsRef.child(item._key).set({
          name: newName,
          isEditing: false,
          isDeleting: false,
          completed: false
      })
  }//_handleEditSave

  _editItem(item){
      //edit item
      this.itemsRef.child(item._key).set({
          name: item.name,
          isEditing: true,
          isDeleting: false,
          completed: false
      })
  }//_editItem

  render() {
    return (
      <View>
        <StatusBar backgroundColor='#00897b' />
        <Header navigator={this.props.navigator} title={this.props.title}  />
        <SearchArea 
          handleAdd={this._addItem} 
          deleteMode={this.props.deleteMode} 
          modeChange={this.props.modeChange} 
          deleteQuery={this._deleteQuery} 
        />
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem} />
      </View>
    )//return
  }//render
}//component
