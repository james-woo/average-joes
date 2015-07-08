var express = require('express');
var router = express.Router();
var User = require('../../../app/models/user')
var passport = require('passport');

router.get('/:uid',function(req,res){
  var key = req.params.uid;
  host=req.get('host');
  User.findOne({key: key}, function(err, user){
  if((req.protocol+"://"+req.get('host'))==("http://"+host)){
    if(err){
      res.end("<h1>Bad Request</h1>");
    } else{
      user.confirmed = "true";
      user.save();
      res.render('layout');
    }
  } else{
    res.end("<h1>Request is from unknown source</h1>");
  }
  });
});

module.exports = router;
