const mongoose = require('mongoose');
const { Schema } = mongoose;



const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'

  },
  title: {
    type: String,
    requireed: true
  },
  description: {
    type: String,
    requireed: true,

  },
  tag: {
    type: String,
    default: "General"

  },

  date: {
    type: String,
    default: Date.now
  },

});

module.exports = mongoose.model('notes', NotesSchema);