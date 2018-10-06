import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyAccount from './MyAccount';
import Login from './Login';
import Signup from './Signup';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/account" component={MyAccount}/>
      </Switch>
    );
  }
}

export default Routes;