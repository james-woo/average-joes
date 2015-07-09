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
      res.redirect('/sorry');
    } else{
      if(user == null){
        res.redirect("/sorry");
        return;
      }
      user.confirmed = "true";
      user.save();
      res.render('layout');
    }
  } else{
    res.redirect("/sorry");
  }
  });
});

module.exports = router;
