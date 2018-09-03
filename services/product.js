const Product = require("../models/product.js");

const getProducts = async (req, res, next) => {
  try {
    const [limit, page] = [5000, req.query.page];
    const skip = page * limit;
    const query = req.query.isActive ? { isActive: true } : {};
    const products = await Product.find(query, {}, { skip, limit })
    res.json(products);
  }
  catch (err) { next({ route: "GET products", err }) }
};
const getProductByID = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params._id);
    res.json(product);
  }
  catch (err) { next({ route: "GET products/:_id", err }) }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  }
  catch (err) { next({ route: "POST products", err }) }
};

const updateProduct = async (req, res, next) => {
  try {
    let product = req.body;
    const update = {
      name: product.name
    }

    product = await Product.findOneAndUpdate({ _id: req.params._id }, update, {});
    res.json(product);
  }
  catch (err) { next({ route: "PUT products/:_id", err }) }
};

const removeProduct = async (req, res, next) => {
try {
  // Eventually needs to be changed to #orders related to this product === 0
  if (false) {
    const product = await Product.remove({ _id: req.params._id });
    res.json(product);
  }
  else {
    const product = await Product.findOneAndUpdate({ _id: req.params._id }, { isActive: false }, {});
    res.json(product);
  }
}
catch (err) { next({ route: "DELETE products", err }) }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  removeProduct,
};
