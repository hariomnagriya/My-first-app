const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Product ={
  productTitle:String,
  productDetail:String,
  productPrice:Number,
  productSelling:Number,
  file:String,
  cid:String
};

const ProductModel = mongoose.model('Product', Product);

module.exports = ProductModel;