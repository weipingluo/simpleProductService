'use strict';
module.exports = function(app) {
  var product = require('../controllers/productController');

  // Routes
  app.route('/products')
    .get(product.list_all_items)
    .post(product.create_an_item);


//   app.route('/products/:itemId')
//     .get(product.read_an_item)
//     .put(product.update_an_item)
//     .delete(product.delete_an_item);
};