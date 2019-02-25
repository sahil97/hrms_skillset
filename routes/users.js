const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
var AllUsers;

router.get('/',(req,res)=>{
  User.find(function (err, users) {
    if (err) return console.error(err);
    console.log(users);
    res.json(users);
  });
});


// -----get user by id-------


router.get('/user/:id',async function(req,res){

  console.log("getting a user");

  var token = await jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
  User.findOne({
    _id:req.params.id
  })
  .exec(function(err,users){
    if(err)
    {
      console.log("got some issue");
    }
    else
    {
      console.log(users);
      res.json (users);
    }
  });
}
else {
      res.status(403).send("not a admin");
}
});
});



/// ---- Login request  -----
router.post('/login',(req,res)=>{
  // console.log(req.body);
  User.findOne({username:req.body.username},async (err,user)=>{
    console.log(user);
    if(!user) {return res.status(404).send("Incorrect username");}
    var validpass = await bcrypt.compare(req.body.password,user.password);
    console.log(validpass);
    if(!validpass){
        return res.status(400).send("incorrect password");
      }
      else{
        var token = jwt.sign({ username:user.username},config.get('jwtPrivateKey'));
        console.log(user);
        return res.header('x-auth-token',token).send(user.role);
      }
  });
});



/// ---- user registration -----


router.post('/register',async (req,res)=>{
  var token = await jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},async (err,user)=>{
    if(user.role == "sa"){

  var user = User.findOne({"username":req.body.username},async (err,user)=>{
    console.log(user);
    if(user) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password,salt);
    user = new User ({name:"Test",role:"u",username:req.body.username,password:pass,skills:[],pic:""});
    user.save((err,user)=>{
      if (err) return console.error(err);
      console.log("saved");
    });
    res.json(user);
  });
  }
  else {
    res.status(403).send("not a admin");
  }
});

});

/// ------ user details change  -----
router.put('/register/:id',async (req,res)=>{
  var token = await jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
    User.findOneAndUpdate({_id:req.params.id}, {username:req.body.username,name:req.body.name},{new: true}, (err,user)=>{
      if( !user) {
                // console.log(err);
                // console.error( JSON.stringify( err ) );
                return res.status(404).send( "Username not found" );
            }

        console.log("saved");
        res.json(user);
    });
  }
  else {
      res.status(403).send("Not a admin");
  }
});
});


//// ----- user delete -----

router.delete('/register/:id',async (req,res)=>{

  var token = await jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
  User.findOneAndRemove({_id:req.params.id}, (err,user)=>{
    if( !user ) {
              // console.error( JSON.stringify( error ) );
              return res.status(404).send( "username not found" );
          }

      console.log("saved");
      res.json(user);
  });
}
else {
  res.status(403).send("not a admin");
}
});
});

/// --- get user skills ------
router.get('/skills',(req,res)=>{
  var token = jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log(token);
  User.findOne({username:token.username},(err,user)=>{
    console.log(user);
    var res_data = {skills:user.skills,name:user.name,username:user.username,path:user.path};
    res.json(res_data);
  });
});



/// --- Edit user Skills ---
router.put('/skills',(req,res)=>{
  var token = jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log(token);
  User.findOne({username:token.username},(err,user)=>{
    user.skills = user.skills.concat(req.body.skills);
    user.save((err,user)=>{
      res.json(user.skills);
    });
  });
});

///---- user recommendation--------

router.post('/getBySkill',async function(req,res){

  console.log("getting users by their skill");

  var token = await jwt.verify(req.get('x-auth-token'),config.get('jwtPrivateKey'));
  console.log("here",token);
  var username = token.username;

  User.findOne({username:username},(err,user)=>{
    if(user.role == "sa"){
      User.find(function (err, users) {
        if (err) return console.error(err);

        var reqUser=[];
        var count=0;
           for(i =0; i< users.length;i++)
           {
            var userSkills = users[i].skills;
            var userName = users[i].username;
            var myArr=req.body.skills;
            console.log(myArr);

            var status=1;

            for(j=0;j<myArr.length;j++)
              {
                if(!userSkills.includes(myArr[j]))
                status=0;
              }

            if(status==1)
              {
                var finUser ={

                name:userName,
                skills:userSkills

              };
              reqUser[count]=finUser;
              count++;
              // console.log(finUser);
            }

           }
          res.json(reqUser);
      });
    }
else {
      res.status(403).send("not a admin");
}
});
});

exports.router = router;
exports.user = User;
