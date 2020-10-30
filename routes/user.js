const express = require('express');
const router = express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

/* GET home page. */

router.post('/register', (req, res, next)=> {
  const {name,password}=req.body;
  bcrypt.hash(password, 10).then((hash)=> {
    const user= new User({
      name,
      password:hash
    });
    const promise= user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
  });
});

router.post('/authenticate', (req, res, next)=>{
  const {name,password}=req.body;
  User.findOne({
    name
  },(err,user) =>{
    if(err)
      throw err;
    if(!user){
      res.json({
        status:false,
        message:"authentication failed ,user not found"
      });
    }else{
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:"authentication failed ,wrong password"
          });
        }else{
          const payload={
            name
          }
          const token=jwt.sign(payload,req.app.get("api_secret_key"));
          res.json({
            status:true,
            token
          });
        }
      });
    }
  });
});


module.exports = router;
