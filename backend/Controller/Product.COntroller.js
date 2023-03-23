const productModel = require('../Models/Product.Model');

async function getProducts(req, res) {
  try {
    const dbProducts = await productModel.find();
    return res.status(200).send(dbProducts);
  } catch (er) {
    return res.status(404).send(er.message);
  }
}
async function getSingle() {
  const { id } = req.params;
  try {
    const dbProducts = await productModel.findOne({ _id: id });
    return res.status(200).send(dbProducts);
  } catch (er) {
    return res.status(404).send(er.message);
  }
}
module.exports = { getProducts, getSingle };
