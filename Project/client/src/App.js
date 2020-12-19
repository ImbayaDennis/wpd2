import React from 'react';
import Dashboard from './Componemts/Dashboard';
import PrivateRoute from './Componemts/auth/PrivateRoute';
import Signup from './Componemts/Signup';
import Login from './Componemts/Login';
import Page404 from './Componemts/Page404'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute component={Page404} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
