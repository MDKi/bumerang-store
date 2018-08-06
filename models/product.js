const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const Product = module.exports = mongoose.model('Product', productSchema);


module.exports.getProducts = (callback, limit) => {
	Product.find(callback).limit(limit);
}

module.exports.getProductById = (id, callback) => {
	Product.findById(id, callback);
}

module.exports.addProduct = (product, callback) => {
	Product.create(product, callback);
}

module.exports.updateProduct = (id, product, options, callback) => {
	const query = {_id: id};
	const update = {
    name: product.name
	}
	Product.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeProduct = (id, callback) => {
	const query = {_id: id};
	Product.remove(query, callback);
}
