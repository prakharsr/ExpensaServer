import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../models/store';
import './App.css';
import Navbar from './Navbar';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="bg-color"></div>
          <Navbar/>
          <div className="container">
            <br/><br/>
            <Routes/>

            <br/><br/>
          </div>
        </div>
      </Provider>
    );
  }
}
  
export default App;