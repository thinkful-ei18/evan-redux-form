import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import Complaint from './Complaint';

 class App extends Component {
  render() {
    return (
      <Provider store= {store}>
        <Complaint/>
      </Provider>      
    );
  }
}


export default App;
