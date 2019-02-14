const express = require('express');
const morgan = require('morgan');

var app = express();



//// Hardcoded variables
var skills = [
  {id:1,name:"HTML"},
  {id:2,name:"JS"},
  {id:3,name:"CSS"}
];


var users = [
  {id:1,name:"admin",role:"sa",username:"abc@abc.com",password:"test",skills:[],pic:"path.."},
  {id:2,name:"user",role:"u",username:"u@abc.com",password:"test",skills:["CSS","ES"],pic:"path.."},
  {id:3,name:"user1",role:"u",username:"a@abc.com",password:"test",skills:[],pic:"path.."}
]

var env = "development";





/// Middlewares
app.use(express.json());
app.use(express.static('public'));

if(env == "development"){
  app.use(morgan('tiny'));
  console.log('Morgan enabled. Dev enviornment');
}






//// ROUTES


app.get('/',(req,res)=>{
  res.send('Homepage');
});



//// api for skills

app.get('/api/skills',(req,res)=>{
  res.json(skills);
});

app.get('/api/skills/:id',(req,res)=>{
  const skill = skills.find(function(skill){
    return skill.id === parseInt(req.params.id);
  })
  if(!skill) return res.status(404).send("Skill not found");

  res.json(skill);
});

app.post('/api/skills',(req,res)=>{
  var skill = skills.find(c => c.name === req.body.name);
  if(skill) return res.status(400).send("skill already exists");

  skill = {id: skills.length+1,name:req.body.name};
  skills.push(skill);
  res.json(skill);
});


app.put('/api/skills/:id',(req,res)=>{
  var skill = skills.find(c => c.id === parseInt(req.params.id));
  if(!skill) return res.status(404).send("Invalid id");

  skill.name = req.body.name;
  res.json(skill);
});


app.delete('/api/skills/:id',(req,res)=>{
  var skill = skills.find(c => c.id === parseInt(req.params.id));
  if(!skill) return res.status(404).send("Skill not found");

  skills.splice(skills.indexOf(skill),1);
  res.send(skill);
});





//// API for users

app.get('/api/users',(req,res)=>{
  res.json(users);
});

/// ---- Login request  -----
app.post('/api/users/login',(req,res)=>{
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

app.post('/api/users/register',(req,res)=>{
  var user = users.find(u => u.username === req.body.username);
  if(user) return res.status(400).send("User already exists");

  user = {id:users.length+1,name:"",role:"u",username:req.body.username,password:req.body.password,skills:[],pic:""};
  users.push(user);
  res.json(user);

});

/// ------ user details change  -----
app.put('/api/users/register/',(req,res)=>{
  var user = users.find(u => u.username === req.body.uid); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  user.username = req.body.username;
  user.password = req.body.password;

  res.json(user);
});


//// ----- user delete -----

app.delete('/api/users/register',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  users.splice(skills.indexOf(user),1);
  res.send(user);

});

//// API for user interaction


/// --- get user skills
app.get('/api/userskills',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  res.send(user.skills);
});



/// --- Edit user Skills ---
app.put('/api/userskills',(req,res)=>{
  var user = users.find(u => u.username === req.body.username); // uid == previous username
  if(!user) return res.status(404).send("incorrect Username");

  user.skills = user.skills.concat(req.body.skills);
  res.send(user.skills);
});









/// APP

const PORT = process.env.PORT || 3333;
app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
})
