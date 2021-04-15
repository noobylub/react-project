const express = require("express");

const router = express.Router();
const placeRoutes = require("../controller/place-controller")



router.get("/get-place/:id", placeRoutes.getPlaceID );




router.post("/post", placeRoutes.newPlace);
router.put("/edit/:id", placeRoutes.editPlace);
router.get("/delete/:id", placeRoutes.deletePlace);
router.get('/get-user-place/:id', placeRoutes.getPlaceByUsers);
router.get('/all-place', placeRoutes.getAllPlace)
 

module.exports = router;
