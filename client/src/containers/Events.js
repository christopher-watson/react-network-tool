import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from '../components/Navbar';
import API from "../utils/API";
import Cards from '../components/Card';


class Events extends Component {
  state = {
    isLoggedIn: true,
    username: "",
    event: "",
    eventUsers: [],
  }

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
    this.handleEvent(this.props.match.params.event);
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

  handleEvent = (code) => {
    if(code){
      this.setState({event: code})
      API
        .getEventUsers(code)
        .then(res => {
          // console.log(res.data[0]._users);
          this.setState({eventUsers: res.data[0]._users})
        })
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login"/>
    }
    const isEvent = this.state.event;
    return (
      <div>
        <Navbar/> 
        {/* <div className="container-fluid my-5"> */}
        <div className="container my-3">
          <div className="row justify-content-center">
            <h1>{isEvent ? this.state.event : "No Event Selected"}</h1>
          </div>
          <div className="row justify-content-center card-row mt-5">
          {/* add users here */}
          <Cards eventUsers={this.state.eventUsers}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Events;