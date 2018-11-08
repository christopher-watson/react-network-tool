import axios from 'axios';

export default {
  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds)
  },

  loginCheck: function() {
    return axios.get('/api/users/login')
  },

  logout: function() {
    return axios.get('/api/users/logout')
  },

  register: function(userInfo) {
    console.log(userInfo);
    return axios.post("/api/users/register", userInfo)
  },

  // create event
  createEvent: function(code){
    return axios.post('/api/events', code)
  },

  // join event
  checkIfEventExist: function(code){
    return axios.get(`/api/events/${code}`)
  },

  // grab users from event
  getEventUsers: function(event) {
    return axios.get(`/api/events/all/${event}`)
  },

  // add user to event
  addUserToEvent: function(event, userInfo) {
    return axios.post(`/api/events/add/${event}`, userInfo)
  },

  // add event to user db
  addEventToUser: function(event, userInfo) {
    return axios.post(`/api/users/add/${event}`, userInfo)
  },

  // find user by username
  findByUserName: function(userId) {
    return axios.get(`/api/users/${userId}`)
  },

  //update a user
  updateUser: function(userId, userInfo) {
    return axios.put(`/api/users/${userId}`, userInfo)
  },
  // add user to db
  //addUserToDb: function(id, userInfo) {
    //return axios.put(`/api/users/${id}`, userInfo)
  //}

}