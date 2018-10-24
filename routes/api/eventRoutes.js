const router = require('express').Router();
const eventController = require('../../controllers/eventController');

// ../api/events
router
  .route("/")
  .get(eventController.findAll)
  .post(eventController.create);

// ../api/events/:id
router
  .route("/:id")
  .get(eventController.findByCode)
  .put(eventController.update)
  .delete(eventController.remove);

// ../api/events/all
router
  .route('/all/:id')
  .get(eventController.findAllUsers)

// ../api/events/add/:id
router
  .route('/add/:id')
  .post(eventController.addUser)

module.exports = router;
