import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class User extends Component {
  state = {
    isLoggedIn: true,
    success: false,
    username: "",
    password: "",
    name: "",
    // photo: "",
    email: "",
    phone: "",
    twitter: "",
    fb: "",
    link: "",
    git: "",
    eventPath: "",
    userId: ""
  }

  componentDidMount() {
    this.loginCheck();
    this.getPath();
    setTimeout(() => { this.getUserInfo() }, 800);
  }
  // Check login status
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn,
        username: res.data.username
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

  // Method to update a new user
  updateUser = (e) => {
    e.preventDefault();
    // console.log(this.state);
    API
      .updateUser( this.state.userId, {
        name: this.state.name,
        photo: this.state.photo,
        email: this.state.email,
        phone: this.state.phone,
        twitter: this.state.twitter,
        fb: this.state.fb,
        link: this.state.link,
        git: this.state.git
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response.data))
    API
      .addUserToEvent( this.state.eventPath, {_id: this.state.userId})
      .then(res => {
        console.log(res.data);
        this.setState({
          success: res.data
        })
      })
      .catch(err => console.log(err.response.data));
  }

  getPath = () => {
    // console.log(window.location.pathname)
    const pathname = window.location.pathname;
    const eventPath = pathname.substring(6, 10);
    console.log("eventPath: " + eventPath);
    this.setState({eventPath: eventPath});
  }

  getUserInfo = () => {
    if(this.state.isLoggedIn){
      API
        .findByUserName(this.state.username)
        .then(res => {
          console.log(res.data._id);
          this.setState({
            userId: res.data._id,
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            twitter: res.data.twitter,
            fb: res.data.fb,
            link: res.data.link,
            git: res.data.git
          })
        })
        .catch(err => console.log(err.response.data));
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>
      }
    // If Signup was a success, take them to the event page
    if (this.state.success) {
      return <Redirect to={{
        pathname: `/events/${this.state.eventPath}`,
      }}/>
    }

    return (
      <div>
        <div className="container my-5">
          <h3>Update Profile!</h3>
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
                  // placeholder="Name"
                  required 
                />
                <div className="invalid-feedback">
                  Please provide your name
                </div>
              </div>
              {/* <div className="col-md-6 mb-3">
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
              </div> */}
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
                  // placeholder="Email"
                  required 
                />
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
                  // placeholder="555-222-1337"
                />
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
                  // placeholder="jimbosmith"
                  aria-describedby="inputGroupPrepend" 
                />
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
                    // placeholder="janesmith"
                    aria-describedby="inputGroupPrepend" 
                  />
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
                    // placeholder="willsmith"
                    aria-describedby="inputGroupPrepend" 
                  />
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
                    // placeholder="cooljames"
                    aria-describedby="inputGroupPrepend" 
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mt-2"
              id="contactInfoSubmit"
              type="button"
              onClick={this.updateUser}
            >Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default User;