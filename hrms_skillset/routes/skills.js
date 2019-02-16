const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const users = require('./users');
var User = users.user;
mongoose.connect('mongodb://kaybee:kaybee7697@ds157641.mlab.com:57641/skillset');

var skillsSchema = new mongoose.Schema({
  name:String
})

var Skills = mongoose.model('skills',skillsSchema);
//// api for skills

// router.get('/',(req,res)=>{
//   res.json(skills);
// });

router.get('/Allskills',(req,res)=>{
  Skills.find(function (err, users) {
    if (err) return console.error(err);
    console.log(users);
    res.json(users);
  });
});

router.post('/makeskill',async function(req,res){
  var token = await jwt.verify(req.get('x-auth-token'),'bootcamp');
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
      Skills.create(req.body,function(err,user){
        if(err)
        {
          console.log("something went wrong");
        }
        else{
          // console.log(user);
          res.send(user);
        }
      });
    }
    else {
      res.status(403).send("Not a admin");
    }
  });


});

// router.put('/:id',(req,res)=>{
//   var skill = skills.find(c => c.id === parseInt(req.params.id));
//   if(!skill) return res.status(404).send("Invalid id");
//
//   skill.name = req.body.name;
//   res.json(skill);
// });

router.put('/skill/:id',function(req,res){
  var token = await jwt.verify(req.get('x-auth-token'),'bootcamp');
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){

  Skills.findOneAndUpdate(
    {_id:req.params.id},

    {$set:

      { name:req.body.name
      }
    },

      {upsert:true},

    function(err,updatedSkill){
      if(err)
      {
        console.log("error occured");
      }
      else
      {
        console.log(updatedSkill);
        res.send(updatedSkill);
      }
    });
  }
  else {
    res.status(403).send("Not a admin");
  }
});
});


// router.delete('/:id',(req,res)=>{
//   var skill = skills.find(c => c.id === parseInt(req.params.id));
//   if(!skill) return res.status(404).send("Skill not found");
//
//   skills.splice(skills.indexOf(skill),1);
//   res.send(skill);
// });


router.delete('/skills/:id',function(req,res){
  var token = await jwt.verify(req.get('x-auth-token'),'bootcamp');
  console.log("here",token);
  var username = token.username;
  ser.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
    Skills.findOneAndRemove(
      {_id:req.params.id},
      function(err,deletedUser){
        if(err){
          console.log("error");
        }
        else{
          console.log(deletedUser);
            }
          });
      }
      else {
          res.status(403).send("Not a admin");
      }
    });
});


module.exports = router;
