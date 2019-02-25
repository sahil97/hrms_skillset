const path = require('path');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const user = require('./routes/users.js')
const users = user.router;
const skills = require('./routes/skills.js')
var app = express();


//// Hardcoded variables

var env = "development";

/// Middlewares
app.use(express.json());
// app.use(express.static(__dirname+'/views'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));

// if(env == "development"){
//   app.use(morgan('tiny'));
//   console.log('Morgan enabled. Dev enviornment');
// }

//// external ROUTES
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/api/users',users);
app.use('/api/skills',skills);

//// ROUTES

//
//
// app.get('/login',(req,res)=>{
//   res.sendFile('/views/index.html',{root:__dirname});
// });

/// APP

const PORT = process.env.PORT || 3333;
app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
  // console.log(config.get("jwtPrivateKey"));
})
