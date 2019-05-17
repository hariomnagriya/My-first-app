const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cat ={
    c_id:String,
    category:String
}

const catModel = mongoose.model('cat', cat);

module.exports = catModel;