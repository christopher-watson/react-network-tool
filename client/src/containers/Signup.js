import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Hero from "../components/Hero";

class Login extends Component {
  state = {
    isLoggedIn: true,
    success: false,
    username: "",
    password: "",
    name: "",
    photo: "",
    email: "",
    phone: "",
    twitter: "",
    fb: "",
    link: "",
    git: "",

  }

  componentDidMount() {
    this.loginCheck();
  }
  // Check login status
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn      }))
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
        password: this.state.password,
        name: this.state.name,
        // photo: this.state.photo,
        email: this.state.email,
        phone: this.state.phone,
        twitter: this.state.twitter,
        fb: this.state.fb,
        link: this.state.link,
        git: this.state.git
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          success: res.data
        })

      })
      .catch(err => console.log(err.response.data));
  }

  //addUserToDb = () => {
  //API
  //.findByUserName(this.username)
  //.then(res => {
  //console.log(res);
  // API.addUserToDb(res.data._id, {
  //   Name: this.state.name,
  //   Email: this.state.email,
  //   Photo: this.state.photo,
  //   Phone: this.state.phone,
  //   Twitter: this.state.twitter,
  //   Fb: this.state.fb,
  //   Link: this.state.linked,
  //   Git: this.state.github
  // })

  //})
  //}

  //handleFormSubmit = (e) => {
  //this.register(e);
  //setTimeout(() => { this.addUserToDb() }, 500)
  // this.addUserToDb();
  // }

  render() {
    // If Signup was a success, take them to the Login page
    if (this.state.success) {
      return <Redirect to="/login" />
    }

    // const to check if logged in

    return (
      <div>
        <Hero backgroundImage="https://cdn.makeawebsitehub.com/wp-content/uploads/2016/04/social_media.jpg">
          <h1>Social Swap</h1>
          <h2>The One Stop Shop for Networking!</h2>
        </Hero>

        <div className="container my-5">
          {/* <div className="row justify-content-left"> */}
          <form>
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: 30, marginBottom: 15 }}>Sign Up!</h3>
            <div className="form-row">
              <div className="col-md-5">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  // ternary values?
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  className="form-control"
                  // ternary placeholders ?
                   />
                <small id="usernameHelp" className="form-text text-muted">Enter your username</small>
              </div>
              <div className="col-md-5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="col-md-2">
                {/* <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button> */}
              </div>
            </div>
          </form>
          {/* </div> */}
        </div>
        <div className="container my-5">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: 30, marginBottom: 15 }}>Update Profile!</h3>
          <form>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nameInput">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Name"
                  required />
                <div className="invalid-feedback">
                  Please provide your name
          </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="photo">Upload a Photo</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="photo"
                    name="photo"
                    value={this.state.photo ? this.state.photo : ""} 
                    onChange={this.handleInputChange}
                  />
                  <label className="custom-file-label" htmlFor="userPhoto">Choose file</label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  required />
                <div className="invalid-feedback">
                  Please provide your email address
          </div>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  placeholder="555-222-1337" />
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label htmlFor="twitter">Twitter</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="twitter"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.handleInputChange}
                    placeholder="jimbosmith"
                    aria-describedby="inputGroupPrepend" />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="fb">Facebook</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">facebook.com/</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="fb"
                    name="fb"
                    value={this.state.fb}
                    onChange={this.handleInputChange}
                    placeholder="janesmith"
                    aria-describedby="inputGroupPrepend" />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="link">Linked In</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">linkedin.com/in/</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    name="link"
                    value={this.state.link}
                    onChange={this.handleInputChange}
                    placeholder="willsmith"
                    aria-describedby="inputGroupPrepend" />
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="git">Github</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">github.com/</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="git"
                    name="git"
                    value={this.state.git}
                    onChange={this.handleInputChange}
                    placeholder="cooljames"
                    aria-describedby="inputGroupPrepend" />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mt-2"
              id="contactInfoSubmit"
              type="button"
              onClick={this.register}
            >Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;