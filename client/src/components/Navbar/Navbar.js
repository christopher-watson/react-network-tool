import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import API from '../../utils/API'


class Navbar extends Component {
  state = {
    isLoggedIn: true,
    username: " "
  }

  componentDidMount(){
    this.loginCheck();
  }

  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn, username: res.data.username
      }))
      .catch(err => {
        console.log(err);
        this.setState({isLoggedIn: false})
      })
  }

  render () {
    return (
      <nav className="nav-bar navbar-light bg-light nav-container">
        <NavLink className="navbar-brand" to="/">React-Network-Tool</NavLink>
        <div className="icon-div">
          <ul className="icon-ul">
            <li className="icon-item">
              <NavLink className="nav-link" to="/user">
                {
                  this.state.isLoggedIn 
                  ? <span title="Settings"><i className="fas fa-cog icon" alt="Settings"></i></span>
                  : <span title="Settings"></span>
                }
              </NavLink>
            </li>
            <li className="icon-item">
              <NavLink className="nav-link" to={this.state.isLoggedIn ? "/logout" : "/login"}>
                {
                  this.state.isLoggedIn 
                  ? <span title="Logout"><i className="fas fa-sign-out-alt icon" alt="logout"></i></span>
                  : <span title="Login" className="nav-text">Login</span>
                }
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

