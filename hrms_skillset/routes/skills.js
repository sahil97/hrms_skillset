const express = require('express');
const router = express.Router();

var skills = [
  {id:1,name:"HTML"},
  {id:2,name:"JS"},
  {id:3,name:"CSS"}
];


//// api for skills

router.get('/',(req,res)=>{
  res.json(skills);
});

router.get('/:id',(req,res)=>{
  const skill = skills.find(function(skill){
    return skill.id === parseInt(req.params.id);
  })
  if(!skill) return res.status(404).send("Skill not found");

  res.json(skill);
});

router.post('/',(req,res)=>{
  var skill = skills.find(c => c.name === req.body.name);
  if(skill) return res.status(400).send("skill already exists");

  skill = {id: skills.length+1,name:req.body.name};
  skills.push(skill);
  res.json(skill);
});


router.put('/:id',(req,res)=>{
  var skill = skills.find(c => c.id === parseInt(req.params.id));
  if(!skill) return res.status(404).send("Invalid id");

  skill.name = req.body.name;
  res.json(skill);
});


router.delete('/:id',(req,res)=>{
  var skill = skills.find(c => c.id === parseInt(req.params.id));
  if(!skill) return res.status(404).send("Skill not found");

  skills.splice(skills.indexOf(skill),1);
  res.send(skill);
});

module.exports = router;
