import React, { Component } from 'react'
import { Text, View, ListView, StatusBar } from 'react-native'
import * as firebase from 'firebase'

import Header from './Header'
import SearchArea from './SearchArea'
import Item from './Item'

export default class Inventory extends Component {
    constructor(props){
        super(props)

        const firebaseApp = this.props.firebaseApp
        this.itemsRef = firebaseApp.database().ref("Inventory/items")

        this._addItem = this._addItem.bind(this)
        this._renderItem = this._renderItem.bind(this)
        this._removeItem = this._removeItem.bind(this)
        this._editItem = this._editItem.bind(this)
        this._cancelEdit = this._cancelEdit.bind(this)
        this._handleEditSave = this._handleEditSave.bind(this)
        this._toggleDeleting = this._toggleDeleting.bind(this)
        this._deleteQuery = this._deleteQuery.bind(this)

        this.state = ({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        })//state
    }//constructor

    componentDidMount(){
        this.listenForItems(this.itemsRef)
    }//did Mount

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

        // get children as an array
        let items = []
        snap.forEach((child) => {
            items.push({
            name: child.val().name,
            amount: child.val().amount,
            isEditing: child.val().isEditing,
            shopping: child.val().shopping,
            isDeleting: child.val().isDeleting,
            _key: child.key
            })//push
        })//snap
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        })//state
        })//itemsRef
    }//listenForItems

    _deleteQuery(){
        let qResult = []
        this.itemsRef.orderByChild("isDeleting").equalTo(true).on("child_added", function(snapshot) {qResult.push(snapshot.key)})
        qResult.map((item) => this.itemsRef.child(item).remove())
    }//_deleteQuery

    _renderItem(item){
        return(
            <Item items={item} 
                handleRemove={this._removeItem} 
                handleEdit={this._editItem} 
                cancelEdit={this._cancelEdit} 
                handleEditSave={this._handleEditSave} 
                deleteMode={this.props.deleteMode} 
                handleToggleDeleting={this._toggleDeleting}
                itempassing={this.props.itempassing}
            />
        )//return
    }//_renderItem

    _addItem(name, amount){
        this.itemsRef.push({ name, amount, isEditing: false, shopping: false, isDeleting: false})
    }//_addItem

    _removeItem(item){
        //change the isDeleting state of item to true
        this.itemsRef.child(item._key).set({
            name: item.name,
            amount: item.amount,
            isEditing: item.isEditing,
            shopping: item.shopping,
            isDeleting: true
        })
        this.props.modeChange()
    }//_removeItem

    _editItem(item){
        //edit item
        this.itemsRef.child(item._key).set({
            name: item.name,
            amount: item.amount,
            isEditing: true,
            shopping: item.shopping,
            isDeleting: false
        })
    }//_editItem

    _cancelEdit(item){
        //cancel edit
        this.itemsRef.child(item._key).set({
            name: item.name,
            amount: item.amount,
            isEditing: false,
            shopping: item.shopping,
            isDeleting: false
        })
    }//cancel edit

    _handleEditSave(item, newName, newAmount){
        //edit item
        this.itemsRef.child(item._key).set({
            name: newName,
            amount: newAmount,
            isEditing: false,
            shopping: item.shopping,
            isDeleting: false
        })
    }//_handleEditSave

    _toggleDeleting(item){
        ///get current state
        const currDelState = item.isDeleting
        const newDelState = !currDelState

        //change the isDeleting state of item to true
        this.itemsRef.child(item._key).set({
            name: item.name,
            amount: item.amount,
            isEditing: item.isEditing,
            shopping: item.shopping,
            isDeleting: newDelState
        })
    }//_toggleDeleting

    render() {
        return (
        <View>
            <StatusBar backgroundColor='#00897b' />
            <Header navigator={this.props.navigator} title={this.props.title} />
            <SearchArea handleAdd={this._addItem} deleteMode={this.props.deleteMode} modeChange={this.props.modeChange} deleteQuery={this._deleteQuery} />
            <ListView dataSource={this.state.dataSource} renderRow={this._renderItem} />
        </View>
        )//return
    } //render
}//component

