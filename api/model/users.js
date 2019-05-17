const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User ={
  name:String,
  email:String,
  mobile:Number,
  password:String,
  category:String ,
  idproof:String ,
  file:String
};

const UserModel = mongoose.model('User', User);

module.exports = UserModel;