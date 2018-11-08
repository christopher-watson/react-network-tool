import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import API from "../utils/API";

class Login extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    password: "",
  }

    // Check login status on load
    componentDidMount() {
      this.loginCheck();
    }
  
    // Check login status
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


  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    e.preventDefault();
    API
      .login({username: this.state.username, password: this.state.password})
      .then(res => {
        // console.log(res.data);
        this.setState({isLoggedIn: res.data})

      })
      .catch(err => console.log(err.response));
  }

  // logout = (e) => {
  //   e.preventDefault();
  //   API
  //     .logout({username: this.state.username, password: this.state.password})
  //     .then(res => {
  //       // console.log(res.data);
  //       this.setState({isLoggedIn: res.data})
  //     })
  //     .catch(err => console.log(err.response));
  // }

  render() {
    // If user is logged in, take them to main page
    if (this.state.isLoggedIn) {
      return <Redirect to="/"/>
      }
    else {
        return (
          <div className="container my-5">
            <div className="row justify-content-left">
              <div className="col-sm-4">
                <form>
                  <h2>Login</h2>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      className="form-control"
                      // placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      className="form-control"
                      // placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-success" onClick={this.login}>Login</button>
                  <div className="mt-2">
                    <span>Don't have an account?<a href="/signup"> Signup</a></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    }
  }
  
  export default Login;