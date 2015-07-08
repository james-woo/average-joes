var mongoose = require('../../app/models/mongoose');

var bookableSchema = mongoose.Schema({
  name: String,
  timeSlots: [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot'}],
  bookableType: {type: mongoose.Schema.Types.ObjectId, ref: 'BookableType'}
});

module.exports = mongoose.model('Bookable', bookableSchema);
