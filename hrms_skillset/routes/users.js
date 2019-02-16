const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://kaybee:kaybee7697@ds157641.mlab.com:57641/skillset');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // // we're connected!
  // console.log("connected");
});

var userSchema = new mongoose.Schema({
  name: String,
  role:String,
  username:String,
  password:String,
  skills:[String],
  path:String
});

var User = mongoose.model('User', userSchema);

router.get('/',(req,res)=>{
  User.find(function (err, users) {
    if (err) return console.error(err);
    console.log(users);
    res.json(users);
  });
});


/// ---- Login request  -----
router.post('/login',(req,res)=>{

  User.findOne({username:req.body.username},(err,user)=>{
    console.log(user);
    if(!user) {return res.status(404).send("Incorrect username");}

    else if(user.password == req.body.password){
        return res.status(200).send("successful login");
      }
      else{
        return res.status(400).send("incorrect password");
      }
  });

  // const user = users.find(u => u.username === req.body.username);
  // if(!user) return res.status(404).send("incorrect Username");

  // verifying password
  // console.log(req.body,user);
  // if(user.password == req.body.password){
  //   return res.status(200).send("successful login");
  // }
  // else{
  //   return res.status(400).send("incorrect password");
  // }
});



/// ---- user registration -----


router.post('/register',(req,res)=>{
  var user = User.findOne({"username":req.body.username},(err,user)=>{
    console.log(user);
    if(user) return res.status(400).send("User already exists");

    user = new User ({name:"Test",role:"u",username:req.body.username,password:req.body.password,skills:[],pic:""});
    user.save((err,user)=>{
      if (err) return console.error(err);
      console.log("saved");
    });
    res.json(user);
  });


});

/// ------ user details change  -----
router.put('/register/',(req,res)=>{
    User.findOneAndUpdate({"username":req.body.uid}, {username:req.body.username,password:req.body.password},{new: true}, (err,user)=>{
      if( !user) {
                // console.log(err);
                // console.error( JSON.stringify( err ) );
                return res.status(404).send( "Username not found" );
            }

        console.log("saved");
        res.json(user);
    });
});


//// ----- user delete -----

router.delete('/register',(req,res)=>{

  User.findOneAndRemove({"username":req.body.username}, (err,user)=>{
    if( !user ) {
              // console.error( JSON.stringify( error ) );
              return res.status(404).send( "username not found" );
          }

      console.log("saved");
      res.json(user);
  });
});

/// --- get user skills ------
router.get('/skills',(req,res)=>{

  User.findOne({username:req.body.username},(err,user)=>{
    res.json(user.skills);
  });
});



/// --- Edit user Skills ---
router.put('/skills',(req,res)=>{

  User.findOne({username:req.body.username},(err,user)=>{
    user.skills = user.skills.concat(req.body.skills);
    user.save((err,user)=>{
      res.json(user);
    });
  });
});




module.exports = router;
