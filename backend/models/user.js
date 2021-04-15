const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validationUni = require('mongoose-unique-validator');

const UserSchema = new Schema({
    image:{type:String, required:true},
    name: {type:String, required:true, unique:true},
    placeCount:{type:Number, required:true},
    password:{type:Number, required:true},
    home:{
        lat: {type:Number, required:true }, 
        long:{type:Number, required:true}
    },
    places : [{type:mongoose.Types.ObjectId, required:true, ref:'Place'}]
});
UserSchema.plugin(validationUni);

module.exports = mongoose.model('Users', UserSchema);