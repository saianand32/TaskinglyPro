const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator'); //import express validate

//Create a user using: POST "api/auth/".
router.post('/',[
    body('name','Enter a valid name atleast 3 letters').isLength({min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','Enter atleast 8 letters long password').isLength({min:8})
],(req,res)=>{
    console.log(req.body);
    
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //else create user and send response
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{
        console.log(err);
        res.json({message: err.message})
      });

      //older method to sav to database below*******
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
})

module.exports = router