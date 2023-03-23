const mongoose = require('mongoose');
const file = {
  title: { type: String, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, require: true },
};
const productSchema = new mongoose.Schema(file);
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
