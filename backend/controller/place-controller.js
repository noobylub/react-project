const error = require("../models/HTTPError");

//The places
let places = [
  {
    id: "i1",
    title: "Bali",
    address:
      "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    description: "Monumen nasional dari Indonesia ",
    imageURL:
      "https://loveandroad.com/wp-content/uploads/2020/11/Prices-in-Bali-tours.jpg",
    coordinates: {
      lat: 8.3405,
      long: 115.092,
    },
    creator: "Bob",
    creatorID: "ug"
  },
  {
    id: "i3",
    title: "Monas",
    address:
      "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Merdeka_Square_Monas_02.jpg",
    coordinates: {
      lat: -6.174093505131075,
      long: 106.82712634035484,
    },
    creator: "Bob",
    creatorID: "ug"
  },
  {
    id: "i6",
    title: "Jambi",
    address: "Neng Jambi",
    description: "Jambi iku apik banget lo",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Gentala_arasy_saat_senja.jpg",
    coordinates: {
      lat: 1.6101,
      long: 103.6131,
    },
    creator: "Sono",
    creatorID: "ur"
  },
];
//editing a place
const editPlace = (req, res, next) => {
  const idPa = req.params.id;
  const { title, description, imageURL } = req.body;
  console.log(idPa);
  const idEdit = places.findIndex((place) => {
    return place.id == req.params.id;
  });
  console.log(idEdit);
  var editPlace = places[idEdit];
  editPlace.title = title;
  editPlace.description = description;
  editPlace.imageURL = imageURL;
  places[idEdit] = editPlace;
};
exports.editPlace = editPlace;

//deleting a place
const deletePlace = (req, res, next) => {
  places = places.filter((place) => {
    place.id !== req.params.id;
  });
  res.json({ message: "Done deleting" });
};
exports.deletePlace = deletePlace;


//adding a new place
const newPlace = (req, res, next) => {
  //destructuring
  const {
    id,
    title,
    address,
    description,
    imageURL,
    coord,
    creator,
    creatorID
  } = req.body;
  places.push({
    id,
    title,
    address,
    description,
    imageURL,
    coordinates: {
      lat: coord.lat,
      long: coord.long,
    },
    creator,
    creatorID
  });
  res.send({message:`added ${title} into your list`})
};

exports.newPlace = newPlace;

const getPlaceID = (req, res, next) => {
  console.log("request made");
  const getPlace = places.find((place) => {
    return place.id == req.params.id;
  });
  if (!getPlace) {
    return next(new error("Place is not found", 404));
  }

  res.json(getPlace);
};
exports.getPlaceID = getPlaceID;


const getPlaceByUsers = (req,res,next ) => {
  const userPlaces = places.filter((place) => {
    return place.creatorID==req.params.id;
  });
  if(!userPlaces||userPlaces.length==0){
    return next(new error("Unable to find user", 404))
  }
  res.json(userPlaces);
}
exports.getPlaceByUsers=getPlaceByUsers;


const getAllPlace = (req,res,next) => {
  res.json({places});
}
exports.getAllPlace = getAllPlace;