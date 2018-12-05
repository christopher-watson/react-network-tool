import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navbar from "../components/Navbar";
import axios from 'axios';

const styles = {
  hideUploadText: {
    visibility: 'hidden'
  },
  showUploadText: {
    visibility: 'visible'
  }
}

class User extends Component {
  state = {
    isLoggedIn: true,
    success: false,
    username: "",
    password: "",
    name: "",
    // photo: "",
    email: "",
    phone: "optional",
    twitter: "optional",
    facebook: "",
    linkedin: "",
    github: "",
    eventPath: "",
    userId: "",
    updated: false,
    userHasEvent: false,
    joinedEvents: [],
    joinedEventCodes: [],
    goToEvent: '',
    nameInvalid: false,
    emailInvalid: false,
    phoneInvalid: false,
    twitterInvalid: false,
    facebookInvalid: false,
    linkedinInvalid: false,
    githubInvalid: false,
    formInvalid: true,
    selectedFile: null,
    uploadStarted: false,
    uploadCompleted: false,
    uploadError: false
  }

  componentDidMount() {
    this.loginCheck();
    this.getPath();
    setTimeout(() => { this.getUserInfo() }, 800);
    console.log(this.state)
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
    // this.validateForm()
  }

  // Method to update a new user
  updateUser = (e) => {
    e.preventDefault();
    // console.log(this.state);
    API
      .updateUser( this.state.userId, {
        name: this.state.name,
        // photo: this.state.photo,
        email: this.state.email,
        phone: this.state.phone,
        twitter: this.state.twitter,
        fb: this.state.facebook,
        link: this.state.linkedin,
        git: this.state.github
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
              userId: res.data._id || '',
              name: res.data.name || '',
              email: res.data.email || '',
              phone: res.data.phone || '',
              twitter: res.data.twitter || '',
              facebook: res.data.fb || '',
              linkedin: res.data.link || '',
              github: res.data.git || '',
              joinedEvents: [...res.data._events],
              userHasEvent: true
            })
            setTimeout(() => { this.populateEventIds() }, 1000);
          }
          else{
            this.setState({
              userId: res.data._id || '',
              name: res.data.name || '',
              email: res.data.email || '',
              phone: res.data.phone || '',
              twitter: res.data.twitter || '',
              facebook: res.data.fb || '',
              linkedin: res.data.link || '',
              github: res.data.git || '',
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
        })
      }
  }

  goToEvent = (event) => {
    this.setState({ goToEvent: event })
  }

  validateField = (fieldName, value) => {
    let nameInvalid = this.state.nameInvalid
    let emailInvalid = this.state.emailInvalid
    let phoneInvalid = this.state.phoneInvalid
    let twitterInvalid = this.state.twitterInvalid
    let facebookInvalid = this.state.facebookInvalid
    let linkedinInvalid = this.state.linkedinInvalid
    let githubInvalid = this.state.githubInvalid

    switch(fieldName) {
      case 'name':
        nameInvalid = value.match(/^\s*[a-zA-Z,\s]+\s*$/i)
        if(!nameInvalid){
          this.setState({ nameInvalid: true })
        }
        if(this.state.name === '' || nameInvalid){
          this.setState({ nameInvalid: false })
        }
        // this.validateForm();
        break;
      case 'email':
        emailInvalid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if(!emailInvalid){
          this.setState({ emailInvalid: true })
        }
        if(this.state.email === '' || emailInvalid){
          this.setState({ emailInvalid: false })
        }
        // this.validateForm();
        break;
      case 'phone':
        // phoneInvalid = value.match('');
        phoneInvalid = value.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i)
        if(!phoneInvalid){
          this.setState({ phoneInvalid: true })
        }
        if(this.state.phone === '' || phoneInvalid){
          this.setState({ phoneInvalid: false })
        }
        // this.validateForm();
        break;
      case 'twitter':
        twitterInvalid = value.match(/^[A-Za-z0-9_]{1,15}$/);
        if(!twitterInvalid){
          this.setState({ twitterInvalid: true })
        }
        if(this.state.twitter === '' || twitterInvalid){
          this.setState({ twitterInvalid: false })
        }
        // this.validateForm();
        break;
      case 'facebook':
        facebookInvalid = value.match(/^[A-Za-z0-9_.-]{1,30}$/)
        if(!facebookInvalid){
          this.setState({ facebookInvalid: true })
        }
        if(this.state.facebook === '' || facebookInvalid){
          this.setState({ facebookInvalid: false })
        }
        // this.validateForm();
        break;
      case 'linkedin':
        linkedinInvalid = value.match(/^[A-Za-z0-9_.-]{1,30}$/)
        if(!linkedinInvalid){
          this.setState({ linkedinInvalid: true })
        }
        if(this.state.linkedin === '' || linkedinInvalid){
          this.setState({ linkedinInvalid: false })
        }
        // this.validateForm();
        break;
      case 'github':
        githubInvalid = value.match(/^[A-Za-z0-9_-]{1,30}$/)
        if(!githubInvalid){
          this.setState({ githubInvalid: true })
        }
        if(this.state.github === '' || githubInvalid){
          this.setState({ githubInvalid: false })
        }
        // this.validateForm();
        break;
        
      default:
        break;
    }
  }

  // validateForm = () => { 
  //   if(this.state.name !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.message !== ''){
  //     this.setState({ formInvalid: false })
  //   }
  //   else{
  //     this.setState({ formInvalid: true })
  //   }
  // }

    // This function does the uploading to cloudinary
  handleImportImage = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    })
    if(event.target.files[0]){
      this.setState({
        uploadStarted: true
      })
      setTimeout(() => {
        this.handleUploadImage()
      }, 2500);
    }
  }

  handleUploadImage = () => {
    console.log(this.state.selectedFile)
    const formData = new FormData();
    // formData.append("tags", ''); // Add tags for the images - {Array}
    formData.append('upload_preset', 'yeym33c2'); // Replace the preset name with your own
    formData.append('api_key', '955461444614476'); // Replace API key with your own Cloudinary API key
    // formData.append("timestamp", (Date.now() / 1000) | 0);
    formData.append('file', this.state.selectedFile);
    console.log(...formData);
    return axios.post( "https://api.cloudinary.com/v1_1/yowats0n/image/upload", formData, { 
        headers: { "X-Requested-With": "XMLHttpRequest" }
      })
      .then(response => {
        console.log(response.data.url)
        this.handleUpdateUserImage(response.data.url)
        if(response.data.url){
          this.setState({ uploadCompleted: true })
          setTimeout(() => {
            this.setState({ uploadStarted: false, uploadCompleted: false })
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err)
        if(err){
          this.setState({ uploadError: true })
          setTimeout(() => {
            this.setState({ uploadError: false })
          }, 2000);
        }
      });
  }

  handleUpdateUserImage = image => {
    API
      .updateUser( this.state.userId, {
        photo: image,
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response.data))
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
          {/* <form onSubmit={this.updateUser}> */}
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
                  onBlur={() => this.validateField('name', this.state.name)} 
                />
              <small id="nameError" className="form-text text-danger">
                {this.state.nameInvalid ? 'Please enter a valid name' : ''}
              </small>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photo">Upload a Photo</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="photo"
                    name="photo"
                    accept="image/png, image/jpeg"
                    // onChange={(e) => console.log(e.target.files[0])}
                    onChange={(e) => this.handleImportImage(e)}
                    // value={this.state.photo ? this.state.photo : ""} 
                    // onSubmit={() => this.uploadPhoto}
                  />
                  {
                    this.state.selectedFile
                    ?
                    <label className="custom-file-label" htmlFor="userPhoto">{this.state.selectedFile.name}</label>
                    :
                    <label className="custom-file-label" htmlFor="userPhoto">Choose file</label>
                  }
                </div>
                <small id="photoUpload" className="form-text text-primary" style={this.state.uploadStarted ? styles.showUploadText : styles.hideUploadText}>
                  {this.state.uploadCompleted ? 'Upload Completed!' : 'Uploading your photo..'}
                </small>
                <small id="photoError" className="form-text text-danger" style={this.state.uploadError ? styles.showUploadText : styles.hideUploadText}>
                  {this.state.uploadError ? 'Upload Error! Please try again' : ''}
                </small>
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
                  onBlur={() => this.validateField('email', this.state.email)} 
                  // placeholder="Email"
                  required 
                />
              <small id="emailError" className="form-text text-danger">
                {this.state.emailInvalid ? 'Please enter a valid email address' : ''}
              </small>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.phone || ''}
                  onChange={this.handleInputChange}
                  onBlur={() => this.validateField('phone', this.state.phone)} 
                  // placeholder="555-222-1337"
                />
              <small id="phoneError" className="form-text text-danger">
                {this.state.phoneInvalid ? 'Please enter a valid phone number' : ''}
              </small>
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
                  onBlur={() => this.validateField('twitter', this.state.twitter)} 
                  // placeholder="jimbosmith"
                  aria-describedby="inputGroupPrepend" 
                />
                </div>
                <small id="twitterError" className="form-text text-danger">
                  {this.state.twitterInvalid ? 'Please enter a valid twitter handle' : ''}
                </small>
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
                    id="facebook"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.handleInputChange}
                    onBlur={() => this.validateField('facebook', this.state.facebook)}
                    // placeholder="janesmith"
                    aria-describedby="inputGroupPrepend" 
                  />
                </div>
                <small id="facebookError" className="form-text text-danger">
                  {this.state.facebookInvalid ? 'Please enter a valid facebook url' : ''}
                </small>
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
                    id="linkedin"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.handleInputChange}
                    onBlur={() => this.validateField('linkedin', this.state.linkedin)}
                    // placeholder="willsmith"
                    aria-describedby="inputGroupPrepend" 
                  />
                </div>
                <small id="linkedinError" className="form-text text-danger">
                  {this.state.linkedinInvalid ? 'Please enter a valid username' : ''}
                </small>
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
                    id="github"
                    name="github"
                    value={this.state.github}
                    onChange={this.handleInputChange}
                    onBlur={() => this.validateField('github', this.state.github)}
                    // placeholder="cooljames"
                    aria-describedby="inputGroupPrepend" 
                  />
                </div>
                <small id="githubError" className="form-text text-danger">
                  {this.state.githubInvalid ? 'Please enter a valid username' : ''}
                </small>
              </div>
            </div>
            {
              this.state.nameInvalid || 
              this.state.emailInvalid ||
              this.state.phoneInvalid ||
              this.state.twitterInvalid ||
              this.state.facebookInvalid ||
              this.state.linkedinInvalid ||
              this.state.githubInvalid
              ?
              <button
                className="btn btn-primary disabled"
                id="contactInfoSubmit"
                type="button"
                // onClick={this.updateUser}
                >Submit
              </button>
              :
              <button
                className="btn btn-primary"
                id="contactInfoSubmit"
                type="button"
                onClick={this.updateUser}
                >Submit
              </button>
            }
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


