import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import API from "../utils/API";

class Main extends Component {
  // state = {
  //   isLoggedIn: true,
  //   username: "",
  //   eventCode: "",
  //   codeInput: "",
  //   goToEvent: false,
  //   userNotExist: false,
  //   eventUsers: []
  // }

  // // Check login status on load
  // componentDidMount() {
  //   this.loginCheck();
  // }

  // // Check login status
  // loginCheck = () => {
  //   API
  //     .loginCheck()
  //     .then(res => this.setState({
  //       isLoggedIn: res.data.isLoggedIn, username: res.data.username
  //     }))
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({isLoggedIn: false})
  //     })
  // }

  // // handle input change for state
  // handleInputChange = event => {
  //   console.log(event.target.value);
  //   const value = event.target.value;
  //   this.setState({ 
  //       codeInput: value
  //   });
  // };

  // // displays newly created event code
  // handleCreateEventSubmit = (event) => {
  //   event.preventDefault();
  //   const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
  //   let eventCode = '';
  //   for (let i = 0; i < 4; i++) {
  //     let rnum = Math.floor(Math.random() * chars.length);
  //     eventCode += chars.substring(rnum, rnum + 1);
  //   }
  //   // creates event in db
  //   this.setState({eventCode: eventCode});
  //   API
  //     .createEvent({
  //       Code: eventCode
  //     })
  // }

  // // check to see if event exist
  // // send user to event page if event exist
  //   // else display error message
  // // edit url to display event path
  // handleJoinEventSubmit = event => {
  //   event.preventDefault();
  //   API
  //     .checkIfEventExist(this.state.codeInput)
  //     .then(res => this.setState({ eventUsers: res.data._users }))
  //     .then(
  //       setTimeout(() => { this.addUserHelper() }, 500)
  //     )
  //     .catch(err => {
  //       console.log(err);
  //       // error modal
  //     })
  //   setTimeout(() => { this.setState({goToEvent: true}) }, 1500);
  // }

  // addUserHelper = () => {
  //   API
  //     .findByUserName(this.state.username)
  //     .then(res => {
  //       // console.log(res.data._id)
  //       for(let i = 0; i < this.state.eventUsers.length; i++){
  //         if (this.state.eventUsers[i] !== res.data._id){
  //           console.log("👎🏽")
  //           this.setState({ userNotExist: true })
  //         }
  //       }
  //       setTimeout(() => { 
  //         if(this.state.userNotExist){
  //           API
  //             .addUserToEvent(this.state.codeInput, res.data)
  //         }
  //       }, 800)
  //     })
  // }

  render() {    
    // If user isn't logged in, don't let them see this page
    // if (!this.state.isLoggedIn) {
    //   return <Redirect to="/login"/>
    // }

    // on join submit, 
    // if (this.state.goToEvent) {
    //   return <Redirect to={{
    //     pathname: `/events/${this.state.codeInput}`,
    //   }}
    //   />
    // }

    return (
      <div>
        <h1>Main</h1>
      </div>
    )
  }
}

export default Main;