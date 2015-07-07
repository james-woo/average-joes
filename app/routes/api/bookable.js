var express = require('express');
var router = express.Router();
var Bookable = require('../../../app/models/bookable')
var TimeSlot = require('../../../app/models/timeSlot')

// create timeSlots for each day and link them to the bookable
var createTimeSlots = function(){

  var timeSlotIds = [];

  for(day = 0; day < 7; day++) {
    for(hour = 8; hour < 24; hour++) {
      var timeSlot = new TimeSlot({dayOfWeek: day, hourOfDay: hour});
      timeSlot.save(function(err){});
      timeSlotIds.push(timeSlot._id);
    }
  }
  return timeSlotIds;
}

router.get('/', function(req, res, next){
  Bookable.find({})
  .populate("timeSlots")
  .exec(function(err, bookables){
    if(err){
      res.send(err);
    }
    else{
      res.json({
        bookables: bookables
      });
    }
  });
});

router.post('/', function(req, res, next){

  var bookable = new Bookable({
    name: req.body.bookableName,
    timeSlots: createTimeSlots()
  });

  bookable.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.status(200).send();
    }
  });
});

module.exports = router;
