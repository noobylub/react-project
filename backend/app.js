const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//sets up the URL 
const url =
  "mongodb+srv://user1:123@reflection.vwvvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//uses routers in another file
const places = require("./routes/route-place");
const users = require("./routes/route-user");

const error = require("./models/HTTPError");

//parse all incoming data into json
app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
})

app.use("/places", places);

app.use("/users", users);

app.use((req, res, next) => {
  const err = new error("Unable to find the page", 404);
  next(err);
});

app.use((err, req, res, next) => {
  //if there is a message being sent
  if (res.headerSent) {
    return next(err);
  } else {
    //sending the status of the respond
    res.status(err.codes || 500);
    //sending the message of the thing
    res.json({ message: err.message || "OOOPs something wrong here buddy" });
  }
});

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("succesfull connection");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
