const router = require('express').Router();
const passport = require('passport');
const usersController = require('../../controllers/usersController');

// Matches with "/api/user/login"
router
  .route('/login')
  .post(passport.authenticate('local'), function(req, res) {
    // Log in and send back user information
    console.log(req.user);
    // if(req.user){
    //   console.log(`${req.user.username} has logged in`)
    // }
    res.json(req.user);
  })
  .get(function(req, res) {
    // Check to see if user is logged in
    console.log(req.user);
    if (req.user) {
      // If logged in, send back this flag and the username itself
      // NOTE: you can send back whatever you want here
      res.json({isLoggedIn: true, username: req.user.username});
    } else {
      // If user isn't logged in, send back false
      res.json(false);
    }
  });

// logout route
router
  .route('/logout')
  .get(function(req,res) {
    // Log user out
    req.logout()
    console.log(req.user);
    res.json(false);
  })

// Matches with "/api/users/:id"
router
  .route('/:id')
  .get(usersController.findByUserName)
  .put(usersController.update)
  .delete(usersController.remove);

// register a new user ("/api/users/register")
router
  .route('/register')
  .post(usersController.register);

// add event to user db
// api/users/add/event
router
  .route('/add/:id')
  .post(usersController.addEvent);

module.exports = router;
