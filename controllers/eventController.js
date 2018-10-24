const Events = require('../models/events');

//controller methods
module.exports = {
  findAll: function(req, res) {
    Events
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Events
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByCode: function(req, res) {
    Events
      .findOne({Code: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Events
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Events
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Events
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllUsers: function(req, res){
    Events
      .find({ Code: req.params.id })
      .populate('_users')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addUser: function(req, res) {
    // console.log(req.params.id)
    Events
      .findOneAndUpdate(
        {Code: req.params.id},
        {$push: {_users: req.body}},
        // {safe: true, upsert: true},
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
