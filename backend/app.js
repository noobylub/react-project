const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const places = require('./routes/route-place');
const users = require('./routes/route-user');

const error = require('./models/HTTPError');


//parse all incoming data into json
app.use(bodyParser.json());


app.use('/places',places);

app.use("/users",users )



app.use((req, res, next)=> {
    const err = new error("Unable to find the page", 404);
    next(err);
})

app.use((err, req, res, next)=> {
    //if there is a message being sent 
    if(res.headerSent){
       return next(err);
    }
   else{ //sending the status of the respond
    res.status(err.codes||500);
    //sending the message of the thing 
    res.json({message: (err.message||"OOOPs something wrong here buddy")})}
})
app.listen(3001);


