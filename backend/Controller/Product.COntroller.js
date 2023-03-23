const productModel = require('../Models/Product.Model');

async function getProducts(req, res) {
  try {
    const dbProducts = await productModel.find();
    return res.status(400).send(dbProducts);
  } catch (er) {
    return res.status(404).send(er.message);
  }
}
module.exports = getProducts;
