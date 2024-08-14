const mongoose = require('mongoose');

const { Schema } = mongoose;


//schemas
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

//by this function cant push duplicate vakues
const User = mongoose.model('user', UserSchema);
module.exports = User;