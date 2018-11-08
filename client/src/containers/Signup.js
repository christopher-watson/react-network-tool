import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class Signup extends Component {
  state = {
    isLoggedIn: true,
    success: false,
    username: "",
    password: "",
    eventPath: "",
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
    this.setState({eventPath: eventPath});
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
        <div className="container my-5">
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
                <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button>
                <div className="mt-2">
                  <span>Already have an account?<a href="/Login"> Sign In</a></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;