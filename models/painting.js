var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Painting', {
  rows : Number,
  columns : Number,
  colorNumber : Number,
  colors : { type: [String], index: true },
  title : String,
  painting : { type: [[String]] },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
