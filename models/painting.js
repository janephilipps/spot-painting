// Grab the mongoose module
var mongoose = require('mongoose');

// Define painting model
// module.exports allows us to pass this to toher files when it's called
module.exports = mongoose.model('Painting', {
  rows : Number,
  columns : Number,
  colors : { type: [String], index: true },
  painting : { type: [[String]] }
});