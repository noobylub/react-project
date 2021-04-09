const error = require("../models/HTTPError");
const { all } = require("../routes/route-place");
const { validationResult } = require("express-validator");
//The users and its methods
const users = [
  {
    id: 1234,
    image: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
    name: "Agus",
    placeCount: 10,
    password: "oRANGE",
    home: {
      longitude: 49.301794335391556,
      latitude: 25.139696918328024,
    },
  },
  {
    id: 12345,
    image: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
    name: "happy kid hello",
    placeCount: 10,
    password: "12333",
    home: {
      longitude: 105.60934978644092,
      latitude: -5.620377696484667,
    },
  },
];

//get user by id
const getUserID = (req, res, next) => {
  const oneUser = users.find((user) => {
    return user.id == req.params.id;
  });
  if (!oneUser) {
    return next(new error("User is not found", 404));
  }
  res.json(oneUser);
};
exports.getUserID = getUserID;

//create new place
const createUser = (req, res, next) => {
  const { id, image, names, placeCount, password, coord } = req.body;
  if (
    users.find((user) => {
      return user.name == names;
    })
  ) {
    return next(
      new error("Username already used, please use another one", 422)
    );
  }
  if (!validationResult(req).isEmpty()) {
    return next(new error("You input something here buddy", 422));
  }
  users.push({
    id,
    image,
    name: names,
    placeCount,
    password,
    home: {
      latitude: coord.lat,
      longitude: coord.long,
    },
  });
};
exports.createUser = createUser;

//login
const login = (req, res, next) => {
  const { name, password } = req.body;
  if (!validationResult(req).isEmpty()) {
    return next(new error("Please input something what the hell", 422));
  }
  const user = users.find((user) => {
    return user.name == name;
  });

  if (!user || user.password != password) {
    return next(new error("Must've put something wrong please try again", 422));
  }

  res.json({ message: "login succesfull", user: user.name });
};
exports.login = login;

const allUsers = (req, res, next) => {
  res.json(users);
};
exports.allUsers = allUsers;
