const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {type: String, required: true},
    address:{type:String, required: true},
    description:{type:String, required:true},
    imageURL:{type:String, required:true},
    coordinates:{
        lat:{type:Number,required:true},
        long:{type:Number,required:true}
    },
    creator:{type:mongoose.Types.ObjectId, required:true, ref:'Users'}

})

module.exports = mongoose.model('Place', placeSchema);

