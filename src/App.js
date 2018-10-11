import React, { Component } from 'react';
import Editor from './components/Editor/Editor'  
import { Provider } from "react-redux";
import store from './store'

class App extends Component {
  
  render(){
    return (
      <Provider store={store}>
        <React.Fragment>
          <Editor />
        </React.Fragment>
      </Provider>
    );
  }
}


export default App;