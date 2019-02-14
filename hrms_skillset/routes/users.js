const express = require('express');
const router = express.Router();




var users = [
  {id:1,name:"admin",role:"sa",username:"abc@abc.com",password:"test",skills:[],pic:"path.."},
  {id:2,name:"user",role:"u",username:"u@abc.com",password:"test",skills:["CSS","ES"],pic:"path.."},
  {id:3,name:"user1",role:"u",username:"a@abc.com",password:"test",skills:[],pic:"path.."}
]


router.get('/',(req,res)=>{
  res.json(users);
});




/// ---- Login request  -----
router.post('/login',(req,res)=>{
  const user = users.find(u => u.username === req.body.username);
  if(!user) return res.status(404).send("incorrect Username");

  // verifying password
  // console.log(req.body,user);
  if(user.password == req.body.password){
    return res.status(200).send("successful login");
  }
  else{
    return res.status(400).send("incorrect password");
  }
});



/// ---- user registration -----


router.post('/register',(req,res)=>{
  var user = users.find(u => u.username === req.body.username);
  if(user) return res.status(400).send("User already exists");

  user = {id:users.length+1,name:"",role:"u",username:req.body.username,password:req.body.password,skills:[],pic:""};
  users.push(user);
  res.json(user);

});

/// ------ user details change  -----
router.put('/register/',(req,res)=>{
  var user = users.find(u => u.username === req.body.uid); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  user.username = req.body.username;
  user.password = req.body.password;

  res.json(user);
});


//// ----- user delete -----

router.delete('/register',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  users.splice(skills.indexOf(user),1);
  res.send(user);

});

/// --- get user skills ------
router.get('/skills',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  res.send(user.skills);
});



/// --- Edit user Skills ---
router.put('/skills',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  user.skills = user.skills.concat(req.body.skills);
  res.send(user.skills);
});




module.exports = router;
