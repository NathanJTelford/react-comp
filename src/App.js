import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import List from './components/List';
import Todo from './components/Todo';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/list' component={List}/>
          <Route path='/Todo/:id' component={Todo}/>
        </Switch>
      </div>
    );
  }
}

export default App;
