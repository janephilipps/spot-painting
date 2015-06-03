// Grab the mongoose module
var mongoose = require('mongoose');

// Define painting model
// module.exports allows us to pass this to other files when it's called
module.exports = mongoose.model('Painting', {
  rows : Number,
  columns : Number,
  colors : { type: [String], index: true },
  title : String,
  painting : { type: [[String]] }
});