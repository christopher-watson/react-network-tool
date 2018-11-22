import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import API from "../utils/API";
import Navbar from "../components/Navbar";

class Login extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    password: "",
    loginInvalid: false,
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
      .catch(err => {
        console.log(err.response);
        if(err.response.data === 'Unauthorized' || err.response.data === 'Bad Request'){
          console.log('🧐');
          this.setState({ loginInvalid: true })
          setTimeout(() => { this.setState({ loginInvalid: false }) }, 3000)
        }
      })

  }

  //server-side validate username
  // validateUserName = () => {
  //   API
  //     .findByUserName(this.state.username)
  //     .then(res => {
  //       console.log(res.data);
  //       if(!res.data){
  //         this.setState({ usernameInvalid: true })
  //       }
  //       if(res.data){
  //         this.setState({ usernameInvalid: false })
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }


  render() {
    // If user is logged in, take them to main page
    if (this.state.isLoggedIn) {
      return <Redirect to="/"/>
      }
    else {
        return (
          <div>
            <Navbar />
            <div className="container my-3">
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
                        // onBlur={() => this.validateUserName()}
                        // placeholder="Username"
                      />
                    </div>
                    {/* <small id="usernameError" className="form-text text-danger">
                      {this.state.usernameInvalid ? 'Username does not exist' : ''}
                    </small> */}
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
                    <small id="loginError" className="form-text text-danger mb-3">
                      {this.state.loginInvalid ? 'Username or Password Incorrect' : ''}
                    </small>
                    <button 
                      type="submit" 
                      className="btn btn-success" 
                      onClick={this.login}
                        >Login
                    </button>
                    {/* {
                      this.state.usernameInvalid ||
                      this.state.passwordInvalid
                      ?
                      <button 
                      type="submit" 
                      className="btn btn-success disabled" 
                      onClick={(e) => e.preventDefault()}
                        >Login
                      </button>
                      :
                      <button 
                      type="submit" 
                      className="btn btn-success" 
                      onClick={this.login}
                        >Login
                      </button>
                    } */}
                    <div className="mt-2">
                      <span>Don't have an account?<a href="/signup"> Signup</a></span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }
  
  export default Login;