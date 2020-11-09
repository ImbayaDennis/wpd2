import React, { Component } from 'react';
import Dashboard from './Componemts/Dashboard';
import Signup from './Componemts/Signup';
import Login from './Componemts/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    fetch('/users').then(res => res.json()).then(users => this.setState({ users }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
