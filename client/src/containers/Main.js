import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import BG from "../components/Images/bg.png";

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: '',
    eventCode: '',
    signMeUp: false,
    // codeInput: "",
    goToEvent: false,
    isEventAvail: true,
    // userNotExist: false,
    // eventUsers: []
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

  // handle input change for state
  handleInputChange = event => {
    // console.log(event.target.value);
    const value = event.target.value;
    this.setState({ 
        codeInput: value
    })
  }

  // displays newly created event code
  handleCreateEventSubmit = (event) => {
    event.preventDefault();
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let eventCode = '';
    if(this.state.isLoggedIn){
      for (let i = 0; i < 4; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        eventCode += chars.substring(rnum, rnum + 1);
      }
      // creates event in db
      this.setState({eventCode: eventCode});
      API
        .createEvent({
          Code: eventCode
        })
      setTimeout(() => { this.setState({goToEvent: true}) }, 800);
    }
    if(!this.state.isLoggedIn){

    }
  }

  handleEventCodeSubmit = event => {
    event.preventDefault();
    API
      .checkIfEventExist(this.state.codeInput)
      .then(res => {
        console.log(res.data)
        if(!res.data){
          //if event !exist => err msg isEventAvail: false
          this.setState({
            isEventAvail: false
          })
          console.log("👎🏽 ");
          console.log();
        }
        if(res.data){
          if(this.state.isLoggedIn){
            console.log("✅ ")
            //add user to event
            this.addUserToEvent();
            //send user to event
            setTimeout(() => { this.setState({goToEvent: true}) }, 800);
          }
          if(!this.state.isLoggedIn){
            //if event exist => send to sign up page, bringing event code
            console.log("🚨 ")
            this.setState({
              signMeUp: true
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  addUserToEvent = () => {
    API
      .findByUserName(this.state.username)
      .then(res => {
        console.log(res.data._id)
        console.log("user data")
        API
          .addUserToEvent(this.state.codeInput, {
            _id: res.data._id,
          })
        API
          // .addEventToUser(this.state.)
      })
    this.setState({eventCode: this.state.codeInput})
  }

  render() {
    // on join submit, 
    if (this.state.goToEvent) {
      return <Redirect to={{
        pathname: `/events/${this.state.codeInput}`,
      }}
      />
    }

    //event submit is pressed
    //event exists
    //user does not have account
    if (this.state.signMeUp) {
      return <Redirect to={{
        pathname: `/signup/${this.state.codeInput}`,
      }}
      />
    }

    return (
      <div className='container'>
        <h2>Main</h2>
        <div className="main-photo-div">
          <img src={BG} alt="" className="main-photo"/>
        </div>
        <div className="col-sm-4">
                <form>
                  <h2>Event Code:</h2>
                  <div className="form-group">
                    <input
                      type="text"
                      name="codeInput"
                      value={this.state.codeInput}
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="CODE"
                    />
                  </div>
                  <button type="submit" className="btn btn-success" onClick={this.handleEventCodeSubmit}>GO</button>
                  {
                    this.state.isEventAvail
                    ? <span></span>
                    : <span className="ml-2 text-danger">Event Not Available!</span>
                  }
                  <div className="mt-2">
                    <span>Create an Event <span className="click-link" onClick={this.handleCreateEventSubmit}>here!</span></span>
                  </div>
                </form>
              </div>
      </div>
    )
  }
}

export default Main;