const error = require("../models/HTTPError");
const mongoose = require('mongoose')
const { validationResult } = require("express-validator");
const User = require("../models/user");

//get user by id
const getUserID = (req, res, next) => {
  User.findById(req.params.id, (err, usr) => {
    if (err) {
      return next(
        new error("Unable to retrieve users, something sus here buddy", 422)
      );
    } else {
      res.json({ user: usr.toObject({ getters: true }) });
    }
  });
};
exports.getUserID = getUserID;

//create new place
const createUser = (req, res, next) => {
  

  const { image, name, placeCount, password, coord } = req.body;
  if (!validationResult(req).isEmpty()) {
    return next(new error("Please input something what the hell", 422));
  }
  const newUser = User({
    image,
    name,
    placeCount,
    password,
    home: {
      lat: coord.lat,
      long: coord.long,
    },
    places : []
  });
  newUser.save((err) => {
    if (err) {
      return next(new error("Something happened here buddy IDK tho lol", 422));
    } else {
      res.json({ user: newUser.toObject({ getters: true }) });
    }
  });
};
exports.createUser = createUser;

//login
const login = async (req, res, next) => {
  const { name, password } = req.body;
  if (!validationResult(req).isEmpty()) {
    return next(new error("Please input something what the hell", 422));
  }
   const user = await User.findOne({name:name});
  if(user&&user.password==password){
    res.json({message:"Succesfully logged in"})
  }
  else{
    return next(new error("Incorrect inputs", 422))
  }
};
exports.login = login;

const allUsers = async (req, res, next) => {
 const allUsers = await User.find({});
 res.json({allusers : allUsers.map(user => user.toObject({getters:true}))})
};
exports.allUsers = allUsers;
