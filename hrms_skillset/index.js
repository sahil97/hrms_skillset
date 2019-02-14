const express = require('express');
const morgan = require('morgan');
const users = require('./routes/users.js')
const skills = require('./routes/skills.js')
var app = express();

//// Hardcoded variables

var env = "development";

/// Middlewares
app.use(express.json());
app.use(express.static('public'));



if(env == "development"){
  app.use(morgan('tiny'));
  console.log('Morgan enabled. Dev enviornment');
}

//// external ROUTES

app.use('/api/users',users);
app.use('/api/skills',skills);

//// ROUTES

app.get('/',(req,res)=>{
  res.send('Homepage');
});


/// APP

const PORT = process.env.PORT || 3333;
app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
})
