const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  creator: {
    type: String
  },
  name: {
    type: String
  },
  content: {
    type: Array
  },
  files: {
    type: Array
  },
  background: {
    type: String
  },
  dateCreated: {
    type: Date,
    "default": Date.now
  },
  dateModified: {
    type: Date,
    "default": Date.now
  }
},
  {
    collection: 'notes'
  });
const notes = mongoose.model('notes', noteSchema);
module.exports = notes;
