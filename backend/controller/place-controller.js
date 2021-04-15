const error = require("../models/HTTPError");
const Places = require("../models/places");
const mongoose = require("mongoose");
const User = require("../models/user");
//The places
// let  = [

// ];
//editing a place
const editPlace = (req, res, next) => {
  const idPa = req.params.id;
  const { title, description } = req.body;
  Places.findByIdAndUpdate(
    idPa,
    {
      title: title,
      description: description,
    },
    (err, document) => {
      if (err) {
        return next(new error("Unable to find this document", 422));
      }
    }
  );
};
exports.editPlace = editPlace;

//deleting a place
const deletePlace = async (req, res, next) => {
  let place; 
  try{
    place = await Places.findById(req.params.id).populate('creator');
    const session = await mongoose.startSession();
    await session.startTransaction();
    place.creator.places.pull(place);
    await place.remove({session:session});
    await place.creator.save({session:session});
    session.commitTransaction();
  }
  catch(err){
    return next(err);
  }
  res.json({message: "removed"})
  
};
exports.deletePlace = deletePlace;

//adding a new place
const newPlace = async (req, res, next) => {
  const { title, address, description, imageURL, coord, creator } = req.body;
  let userAddPlace;
  try{
    userAddPlace = await User.findById(creator);
  }
  catch(err){
    return next(new error("SOmething wrong here ", 404))
  }
  console.log(userAddPlace)
  const place = new Places({
    title,
    address,
    description,
    imageURL,
    coordinates: {
      lat: coord.lat,
      long: coord.long,
    },
    creator,
  });

  //start a new transaction so one thing is off, all things cancelled
 
  try{
    const session = await mongoose.startSession();
    await session.startTransaction();
    await place.save({ session: session });
     userAddPlace.places.push(place);
    await userAddPlace.save({ session: session });
    await session.commitTransaction();
  }
  catch(err){
    console.log(err)
    return next(new error("sum ting wong", 404))
  }
  res.json({ newPlace: place.toObject({ getters: true }) });
};

exports.newPlace = newPlace;

const getPlaceID = (req, res, next) => {
  Places.findById(req.params.id, (err, place) => {
    if (err) {
      return next(new error("Unable to recieve place, something sus rn"));
    } else if(!err) {
      res.json(place.toObject({ getters: true }));
    }
  });
};
exports.getPlaceID = getPlaceID;

const getPlaceByUsers = async (req, res, next) => {
  //populate populates it with the documents with that specific document type
  let user;
  try {
    user = await User.findById(req.params.id).populate("places");
  } catch(err) {
    return next(new error("Unable to retrieve places", 404));
  }

  res.json({
    places: user.places.map(place=> {
      return place.toObject({getters:true})
    })
    })
  }
exports.getPlaceByUsers = getPlaceByUsers;

const getAllPlace = async (req, res, next) => {
  let places = await Places.find({});
  res.json({ place: places.map((place) => place.toObject({ getters: true })) });
};
exports.getAllPlace = getAllPlace;
