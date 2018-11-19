import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './containers/Main';
import Login from './containers/Login';
import Logout from "./containers/Logout";
import Signup from './containers/Signup';
import User from './containers/User';
import Events from './containers/Events';
// import Navbar from './components/Navbar';
import './App.css';

const App = () => (
  <Router>
    <div className="main-container">
      {/* <Navbar/> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route path="/events/:event" component={Events} />
        <Route path="/events" component={Events} />
        <Route path="/signup/:event" component={Signup} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/:event" component={User} />
        <Route path="/user" component={User} />
        <Route path="/logout" component={Logout} />
        <Route component={Main} />
      </Switch>
    </div>
  </Router>
);

export default App;
