var mongoose = require('mongoose');

module.exports = mongoose.model('Painting', {
  rows : Number,
  columns : Number,
  colorNumber : Number,
  colors : { type: [String], index: true },
  title : String,
  painting : { type: [[String]] }
});
