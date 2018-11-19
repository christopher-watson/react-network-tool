import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navbar from "../components/Navbar";

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
    userId: "",
    updated: false,
    userHasEvent: false,
    joinedEvents: [],
    joinedEventCodes: [],
    goToEvent: ''
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
    if(this.state.eventPath){
      API
        .addEventToUser( this.state.userId, { _id: this.state.eventPathId })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err.response.data));
      API
        .addUserToEvent( this.state.eventPath, { _id: this.state.userId })
        .then(res => {
          console.log(res.data);
          this.setState({
            goToEvent: res.data.Code
          })
        })
        .catch(err => console.log(err.response.data));
    }
    if(!this.state.eventPath){
      this.setState({ updated: true });
      setTimeout(() => { this.setState({ updated: false })}, 4000);
     }
  }

  getPath = () => {
    // console.log(window.location.pathname)
    const pathname = window.location.pathname;
    const eventPath = pathname.substring(6, 10);
    console.log("eventPath: " + eventPath);
    if(eventPath){
      this.setState({eventPath: eventPath});
      API
      .checkIfEventExist(eventPath)
      .then(res => {
        console.log(res.data._id);
        this.setState({eventPathId: res.data._id});
        })
    }
  }

  getUserInfo = () => {
    if(this.state.isLoggedIn){
      API
        .findByUserName(this.state.username)
        .then(res => {
          console.log(res.data);
          if(res.data._events.length>0){
            this.setState({
              userId: res.data._id,
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone,
              twitter: res.data.twitter,
              fb: res.data.fb,
              link: res.data.link,
              git: res.data.git,
              joinedEvents: [...res.data._events],
              userHasEvent: true
            })
            setTimeout(() => { this.populateEventIds() }, 1000);
          }
          else{
            this.setState({
              userId: res.data._id,
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone,
              twitter: res.data.twitter,
              fb: res.data.fb,
              link: res.data.link,
              git: res.data.git,
            })
          }
        })
        .catch(err => console.log(err));
    }
  }

  populateEventIds = () => {
    console.log(this.state.joinedEvents);
    for(let i=0; i<this.state.joinedEvents.length; i++){
      API
        .getEventCode(this.state.joinedEvents[i])
        .then(res => {
          console.log(res.data.Code)
          this.setState({
            joinedEventCodes: [...this.state.joinedEventCodes, res.data.Code]
          })
          //if the event is already in the list
          // if (this.state.joinedEventCodes.indexOf(res.data.Code)){
          //   //ignore 
          // }
          // else{
          //   this.setState({
          //     joinedEventCodes: [...this.state.joinedEventCodes, res.data.Code]
          //   })
          // }
        })
      }
  }

  goToEvent = (event) => {
    this.setState({ goToEvent: event })
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>
      }
    // If Signup was a success, take them to the event page
    if (this.state.goToEvent) {
      return <Redirect to={{
        pathname: `/events/${this.state.goToEvent}`,
      }}/>
    }

    return (
      <div>
        <Navbar />
        <div className="container my-3">
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
              className="btn btn-primary"
              id="contactInfoSubmit"
              type="button"
              onClick={this.updateUser}
              >Submit
            </button>
            {
              this.state.userHasEvent
              ? this.state.joinedEventCodes.map(event => (
                  <button key={event} type="button" className="btn btn-success ml-2" onClick={() => this.goToEvent(event)}>{event}</button>
                ))
              : <span></span>
            }
            <br/>
            {
              this.state.updated
              ? <span className="success-message text-success">Your Profile has been Updated!</span>
              : <span></span>
            }
          </form>
        </div>
      </div>
    )
  }
}

export default User;


