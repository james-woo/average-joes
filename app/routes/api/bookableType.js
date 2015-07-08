var express = require('express');
var router = express.Router();
var BookableType = require('../../../app/models/bookableType')

// create timeSlots for each day and link them to the bookable
router.get('/', function(req, res, next){
  BookableType.find({}, function(err, bookableTypes){
    if(err){
      res.send(err);
    }
    else{
      res.json({
        bookableTypes: bookableTypes
      });
    }
  });
});

router.post('/', function(req, res, next){
  if(req.body.name){
    var bookableType = new BookableType({name: req.body.name});

    bookableType.save(function(err){
      if(err){
        res.send(err);
      }
      else{
        res.status(200).send();
      }
    })
  }
  else{
    res.status(403).json({error: "No name value provided in body."});
  }
});

module.exports = router;
