import React from 'react';
import Dashboard from './Componemts/Dashboard';
import Signup from './Componemts/Signup';
import Login from './Componemts/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}  />
          <Route path="/signup" component={Signup}  />
        </Switch>
        <Dashboard />
      </div>
    </Router>
  );
}

export default App;
