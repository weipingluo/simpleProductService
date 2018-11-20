'use strict';
export default function(app) {
  var product = require('../controllers/productController');

  // Routes
  app.route('/products')
    .get(product.list_all_products)
    .post(product.create_a_product);

  app.route('/products/:productCode')
  .get(product.read_a_product)
  .put(product.update_a_product)
  .delete(product.delete_a_product);
};