var mongoose = require('../../app/models/mongoose');

var bookableTypeSchema = mongoose.Schema({
  name: {type: String, index: {unique: true}},
});

module.exports = mongoose.model('BookableType', bookableTypeSchema);
