var mongoose = require('../../app/models/mongoose');

var bookableSchema = mongoose.Schema({
  name: String,
  timeSlots: [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot'}]
});

module.exports = mongoose.model('Bookable', bookableSchema);
