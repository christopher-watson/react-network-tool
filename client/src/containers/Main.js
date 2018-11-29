import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from '../components/Navbar';
import API from "../utils/API";
import BG from "../components/Images/bg.png";

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: '',
    eventCode: '',
    signMeUp: false,
    goToEvent: false,
    isEventAvail: true,
    logInYo: false,
    sendToLogin: false,
    codeInput: "",
    invalidInput: false,
    // eventTimer: 5
  }

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
    setTimeout(() => { this.getUserInfo() }, 800);
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
        codeInput: value.toUpperCase()
    })
  }

  // displays newly created event code
  handleCreateEventSubmit = (event) => {
    event.preventDefault();
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let eventCode = '';
    if(this.state.isLoggedIn){
      for (let i = 0; i < 4; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        eventCode += chars.substring(rnum, rnum + 1);
      }
      // creates event in db
      this.setState({ eventCode: eventCode });
      API
        .createEvent({
          Code: eventCode
        })
      this.setState({ sendingToEvent: true })
      setTimeout(() => { 
        this.setState({ goToEvent: true }) 
      }, 2000);
    }
    if(!this.state.isLoggedIn){
      //send user to login page
      this.setState({ logInYo: true })
      setTimeout(() => { this.setState({logInYo: false}) }, 2000);
    }
  }

  handleEventCodeSubmit = event => {
    event.preventDefault();
    if(this.state.codeInput.length === 4){
      // console.log('🙌🏽')
      API
        .checkIfEventExist(this.state.codeInput)
        .then(res => {
          console.log(res.data)
          if(!res.data){
            //if event !exist => err msg isEventAvail: false
            this.setState({
              isEventAvail: false
            })
            setTimeout(() => { this.setState({ isEventAvail: true })}, 2000);
            console.log("👎🏽");
          }
          if(res.data){
            if(this.state.isLoggedIn){
              console.log("✅")
              //add user to event
              this.addUserToEvent();
            }
            if(!this.state.isLoggedIn){
              //if event exist => send to sign up page, bringing event code
              console.log("🚨")
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
    if(this.state.codeInput.length < 4 || this.state.codeInput.length > 4){
      //invalid input
      this.setState({ invalidInput: true })
      setTimeout(() => { this.setState({invalidInput: false}) }, 1000);
    }
  }

  addUserToEvent = () => {
    //variables to hold IDS
    let functionUserId = ''
    let functionEventId = ''
    //find user, grab ID
    API
      .findByUserName(this.state.username)
      .then(res => {
        console.log("user data")
        console.log(res.data._id)
        functionUserId=res.data._id
      })
      .catch(err => { console.log(err) })
    //find event, grab ID
    API
      .findEventId(this.state.codeInput)
      .then(res => {
        console.log(res.data._id)
        functionEventId=res.data._id
      })
    setTimeout(() => {
      //if the user isnt already in this event, add them to event
      if(this.state.joinedEvents){
        if(this.state.joinedEvents.includes(functionEventId)){
          console.log('user already joined this event')
          console.log(this.state.joinedEvents)
          console.log(functionEventId)
          console.log(functionUserId)
        }
        else{
          console.log('user has not joined this event')
          console.log(this.state.joinedEvents)
          console.log(functionEventId)
          console.log(functionUserId)
          //add user to event using CODE and userID
          setTimeout(() => {
            API
            .addUserToEvent(this.state.codeInput, {
              _id: functionUserId
            })
            .catch(err => { console.log(err) })
          }, 800);
          //add event to user using userID and eventID
          setTimeout(() => {
            API
            .addEventToUser(functionUserId, {
              _id: functionEventId
            })
          .catch(err => { console.log(err) })
          }, 1000);
        }
      }
      else{
        console.log('user has no events')
        console.log(this.state.joinedEvents)
        console.log(functionEventId)
        console.log(functionUserId)
        //add user to event using CODE and userID
        setTimeout(() => {
          API
          .addUserToEvent(this.state.codeInput, {
            _id: functionUserId
          })
          .catch(err => { console.log(err) })
        }, 800);
        //add event to user using userID and eventID
        setTimeout(() => {
          API
          .addEventToUser(functionUserId, {
            _id: functionEventId
          })
        .catch(err => { console.log(err) })
        }, 1000);
      }
      setTimeout(() => { this.setState({ eventCode: this.state.codeInput }) }, 1500);
      setTimeout(() => { this.setState({ goToEvent: true }) }, 2000);
    }, 1000);
    this.setState({ sendingToEvent: true })
  }

  sendToLogin = () => {
    this.setState({ sendToLogin: true })
  }

  getUserInfo = () => {
    if(this.state.isLoggedIn){
      API
        .findByUserName(this.state.username)
        .then(res => {
          console.log(res.data._events);
          if(res.data._events.length>0){
            console.log('has events')
            this.setState({
              // userId: res.data._id,
              // name: res.data.name,
              // email: res.data.email,
              // phone: res.data.phone,
              // twitter: res.data.twitter,
              // fb: res.data.fb,
              // link: res.data.link,
              // git: res.data.git,
              joinedEvents: [...res.data._events],
            })
          }
          else{
            console.log('new user');
            this.setState({
              joinedEvents: []
            })
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    // on join submit, 
    if (this.state.goToEvent) {
      return <Redirect to={{
        pathname: `/events/${this.state.eventCode}`,
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

    if (this.state.sendToLogin) {
      return <Redirect to={{
        pathname: '/login'
      }}
      />
    }

    return (
      <div>
        <Navbar />
        <div className="container my-3">
          <h2>Main</h2>
          <div className="main-photo-div">
            <img src={BG} alt="" className="main-photo"/>
          </div>
          <div className="col-sm-4 my-3">
            <form>
              <h2>Event Code:</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="codeInput"
                  value={this.state.codeInput}
                  onChange={this.handleInputChange}
                  className="form-control"
                  // placeholder="CODE"
                />
              </div>
              {
                this.state.sendingToEvent
                ?
                <button 
                  type="submit" 
                  className="btn btn-success disabled" 
                  onClick={(e) => e.preventDefault()}
                  >GO
                </button>
                :
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  onClick={this.handleEventCodeSubmit}
                  >GO
                </button>
              }
              {
                this.state.isEventAvail
                ? <span></span>
                : <span className="ml-2 text-danger">Event Not Available!</span>
              }
              {
                this.state.invalidInput
                ? <span className="ml-2 text-danger">Invalid Input!</span>
                : <span></span>
              }
              <div className="mt-2">
                <span>Create an Event <span className="click-link" onClick={this.handleCreateEventSubmit}>here!</span></span>
              </div>
            </form>
            {
              this.state.logInYo
              ? <span><span className="text-primary mt-5 click-link" onClick={this.sendToLogin}>Log In</span> First!</span>
              : <span></span>
            }
            {
              this.state.sendingToEvent
              ? <span className="text-primary mt-5">Sending you to the event! .. <i className="fas fa-spinner fa-pulse"></i></span>
              : <span></span>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Main;