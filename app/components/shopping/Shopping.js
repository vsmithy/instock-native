import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Dimensions, Button, AsyncStorage } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'

// the locals
import InputArea from './InputArea'
import ListArea from './ListArea'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../actions/constants'

const LIST_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: item => !item.completed,
  [SHOW_COMPLETED]: item => item.completed
}

export default class Shopping extends Component {
  constructor(props){
    super(props)

    this.state = ({
      filter: 'SHOW_ALL',
    })//state
  }//constructor

  //Life Cycle Methods
  componentDidMount() {
    // console.log('shop did mount')  
    this.initialSetup()
  }//comp did mount

  async componentDidUpdate(){    
    // console.log('Inventory has updated')  
    let myStringAry = JSON.stringify(this.props.shopping)
    try {
      await AsyncStorage.setItem('shopping', myStringAry)
    } catch(error){
      console.log(error)
    }//catch
  }//component did update

  

  // static propTypes = {
  //   completedCount: PropTypes.number.isRequired, 
  //   shopping: PropTypes.array.isRequired,
  //   clearCompleted: PropTypes.func.isRequired, 
  // }//proptypes

  handleFilter(itemFilter){
    this.setState({ filter: itemFilter })
  }//handleFilter


  async initialSetup(){
    //fetching data for initial state
      let initialState
      try{
        const initialData = await AsyncStorage.getItem('shopping')
        const parsedInitialData = JSON.parse(initialData)
        if(parsedInitialData === null || parsedInitialData.length === 0){
          initialState = []
        } else { initialState = parsedInitialData }
      }catch(error){
        console.log('ummm shopping error: ' + error)
      }

      this.props.setInitialShoppingData(initialState)
  }

  renderFooter(){
    const {completedCount, shopping, clearCompleted, replenish} = this.props
    const { filter } = this.state

    if(completedCount > 0){
      return (<Footer 
                completedCount={completedCount} 
                handleFilter={this.handleFilter.bind(this)} 
                filter={filter} 
                clearCompleted={clearCompleted} 
                shopping={shopping}
                replenish={replenish}
              />)
    }//if
  }//renderFooter

  render(){
    const { filter } = this.state
    const { shopping, completedCount } = this.props
    const filterChoice = completedCount > 0 ? filter : 'SHOW_ALL'
    const filteredShoppingList = shopping.filter(LIST_FILTERS[filterChoice])


     return(
      <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
        <InputArea {...this.props} />
        <ScrollView><ListArea {...this.props} filteredShoppingList={filteredShoppingList} /></ScrollView>
        {this.renderFooter()}
      </View>
    )//return
  }//render
}//Shopping

// import React, { Component, PropTypes } from 'react'
// import { View, ScrollView, Dimensions, Button, AsyncStorage } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'

// // the locals
// import InputArea from './InputArea'
// import ListArea from './ListArea'
// import Footer from './Footer'
// import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../actions/constants'

// const LIST_FILTERS = {
//   [SHOW_ALL]: () => true,
//   [SHOW_ACTIVE]: item => !item.completed,
//   [SHOW_COMPLETED]: item => item.completed
// }

// export default class Shopping extends Component {
//   constructor(props){
//     super(props)

//     this.state = ({
//       filter: 'SHOW_ALL',
//     })//state
//   }//constructor

//   //Life Cycle Methods
//   componentDidMount() {
//     // console.log('shop did mount')  
//     this.initialSetup()
//   }//comp did mount

//   async componentDidUpdate(){    
//     // console.log('Inventory has updated')  
//     let myStringAry = JSON.stringify(this.props.shopping)
//     try {
//       await AsyncStorage.setItem('shopping', myStringAry)
//     } catch(error){
//       console.log(error)
//     }//catch
//   }//component did update

  

//   static propTypes = {
//     completedCount: PropTypes.number.isRequired, 
//     shopping: PropTypes.array.isRequired,
//     clearCompleted: PropTypes.func.isRequired, 
//   }//proptypes

//   handleFilter(itemFilter){
//     this.setState({ filter: itemFilter })
//   }//handleFilter


//   async initialSetup(){
//     //fetching data for initial state
//       let initialState
//       try{
//         const initialData = await AsyncStorage.getItem('shopping')
//         const parsedInitialData = JSON.parse(initialData)
//         if(parsedInitialData === null || parsedInitialData.length === 0){
//           initialState = []
//         } else { initialState = parsedInitialData }
//       }catch(error){
//         console.log('ummm shopping error: ' + error)
//       }

//       this.props.setInitialShoppingData(initialState)
//   }

//   renderFooter(){
//     const {completedCount, shopping, clearCompleted, replenish} = this.props
//     const { filter } = this.state

//     if(completedCount > 0){
//       return (<Footer 
//                 completedCount={completedCount} 
//                 handleFilter={this.handleFilter.bind(this)} 
//                 filter={filter} 
//                 clearCompleted={clearCompleted} 
//                 shopping={shopping}
//                 replenish={replenish}
//               />)
//     }//if
//   }//renderFooter

//   render(){
//     const { filter } = this.state
//     const { shopping, completedCount } = this.props
//     const filterChoice = completedCount > 0 ? filter : 'SHOW_ALL'
//     const filteredShoppingList = shopping.filter(LIST_FILTERS[filterChoice])


//      return(
//       <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
//         <InputArea {...this.props} />
//         <ScrollView><ListArea {...this.props} filteredShoppingList={filteredShoppingList} /></ScrollView>
//         {this.renderFooter()}
//       </View>
//     )//return
//   }//render
// }//Shopping