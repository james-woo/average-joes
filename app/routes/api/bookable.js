var express = require('express');
var router = express.Router();
var Bookable = require('../../../app/models/bookable')
var BookableType = require('../../../app/models/bookableType')
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
  .populate("bookableType")
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
  // find the bookable type given in the request body
  BookableType.findOne({name: req.body.bookableTypeName}, function(err, bt){
    if(err){
      res.send(err);
    }
    else if(bt){
      var bookable = new Bookable({
        name: req.body.bookableName,
        timeSlots: createTimeSlots(),
        bookableType: bt
      });

      bookable.save(function(err){
        if(err){
          res.send(err);
        }
        else{
          res.status(200).send();
        }
      });
    }
    else{
      res.status(404).json({error: "Bookable Type not found"});
    }
  });
});

module.exports = router;
