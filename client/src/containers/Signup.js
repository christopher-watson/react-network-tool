import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navbar from "../components/Navbar";

class Signup extends Component {
  state = {
    isLoggedIn: true,
    success: false,
    username: "",
    password: "",
    eventPath: "",
    usernameInvalid: false,
    passwordInvalid: false,
  }

  componentDidMount() {
    this.loginCheck();
    this.getPath();
  }
  // Check login status
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn 
      }))
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false })
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    console.log(this.state);
    API
      .register({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response.data));
    setTimeout(() => {
      API
        .login({username: this.state.username, password: this.state.password})
        .then(res => {
          // console.log(res.data);
          this.setState({
            isLoggedIn: res.data,
            success: res.data
          })
        })
        .catch(err => console.log(err.response));
    }, 900)
  }

  handleFormSubmit = (e) => {
    this.register(e);
    setTimeout(() => { this.addUserToDb() }, 500)
    // this.addUserToDb();
  }

  getPath = () => {
    // console.log(window.location.pathname)
    const pathname = window.location.pathname;
    const eventPath = pathname.substring(8, 12);
    console.log("eventPath: " + eventPath);
    if(eventPath.length>0){
      this.setState({ eventPath: eventPath });
      setTimeout(() => { this.setState({newUser: true}) }, 500)
      setTimeout(() => { this.setState({newUser: false}) }, 2000)
    }
  }

  validateField = (fieldName, value) => {
    let usernameInvalid = this.state.usernameInvalid
    let passwordInvalid = this.state.passwordInvalid

    switch(fieldName) {
      case 'username':
        usernameInvalid = value.match(/^[A-Za-z0-9_]{1,15}$/);
        if(!usernameInvalid){
          this.setState({ usernameInvalid: true })
        }
        if(this.state.username === '' || usernameInvalid){
          this.setState({ usernameInvalid: false })
        }
        // this.validateForm();
        break;
      case 'password':
        passwordInvalid = value.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/);
        if(!passwordInvalid){
          this.setState({ passwordInvalid: true })
        }
        if(this.state.password === '' || passwordInvalid){
          this.setState({ passwordInvalid: false })
        }
        // this.validateForm();
        break;
      
      default:
        break;
    }
  }

  render() {
    // If Signup was a success, 
    //log user in
    //take user to the User page
    if (this.state.success) {
      return <Redirect to={{
        pathname: `/user/${this.state.eventPath}`,
      }}/>
    }

    return (
      <div>
        <Navbar />
        <div className="container my-3">
        {/* <div className="my-5"> */}
          <div className="row justify-content-left">
            <div className="col-sm-4">
              <form>
                <h2>Sign Up</h2>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    className="form-control"
                    onBlur={() => this.validateField('username', this.state.username)} 
                    // placeholder="Username"
                  />
                </div>
                <small id="usernameError" className="form-text text-danger">
                  {this.state.usernameInvalid ? 'Please enter a valid username' : ''}
                </small>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    className="form-control"
                    onBlur={() => this.validateField('password', this.state.password)}
                    // placeholder="Password"
                  />
                </div>
                <small id="passwordError" className="form-text text-danger">
                  {this.state.passwordInvalid ? 'Password must be 8 charcters long. At least 1-CAP, 1-low, 1-$*&!' : ''}
                </small>
                {
                  this.state.usernameInvalid ||
                  this.state.passwordInvalid
                  ?
                  <button 
                    type="submit" 
                    className="btn btn-success disabled" 
                    onClick={(e) => e.preventDefault()}
                    >Sign Up!
                  </button>
                  :
                  <button 
                    type="submit" 
                    className="btn btn-success" 
                    onClick={this.register}
                    >Sign Up!
                  </button>

                  
                }
                <div className="mt-2">
                  <span>Already have an account?<a href="/Login"> Sign In</a></span>
                </div>
              </form>
            {
              this.state.newUser
              ? <span className="text-danger mt-5">Sign Up First!</span>
              : <span></span>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;