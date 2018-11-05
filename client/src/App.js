import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './containers/Main';
import Login from './containers/Login'
import './App.css';

const App = () => (
  <Router>
    <div className="main-container">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route component={Main} />
      </Switch>
    </div>
  </Router>
);

export default App;
