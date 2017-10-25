import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//local stuff
import rootReducer from './app/reducers'
import AppContainer from './app/containers/AppContainer'

const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk) ))

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )//return
  }//render
}//app

export default App