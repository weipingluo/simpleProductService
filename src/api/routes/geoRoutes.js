'use strict';
export default function(app) {
  var geo = require('../controllers/geoController');

  // Routes
  app.route('/countries')
    .get(geo.list_all_countries);

    app.route('/states')
    .get(geo.list_all_states);

    app.route('/states/:stateName')
    .get(geo.read_a_state);

    //   app.route('/products/:itemId')
//     .get(product.read_an_item)
//     .put(product.update_an_item)
//     .delete(product.delete_an_item);
};