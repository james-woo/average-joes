var mongoose = require('../../app/models/mongoose');

var timeSlotSchema = mongoose.Schema({
  dayOfWeek: Number,
  hourOfDay: Number
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
