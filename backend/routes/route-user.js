const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const userRoutes = require("../controller/user-controller");
const { route } = require("./route-place");






router.get("/getUser/:id", userRoutes.getUserID);
router.post(
  "/signup",
  [
    check("image").not().isEmpty(),
    check("name").not().isEmpty(),
    
    check("password").isLength({ min: 3 }),
   
  ],
  userRoutes.createUser
);
router.post("/login", [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
], userRoutes.login);
router.get("/all-users", userRoutes.allUsers);

module.exports = router;
