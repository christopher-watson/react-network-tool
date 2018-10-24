const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  Code: { 
    type: String, 
  },
  _users: [{
    type: [Schema.Types.ObjectId], 
    ref: 'User'
  }]
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;