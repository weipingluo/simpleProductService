'use strict';
import Product from '../../domain/product/Product';

exports.list_all_items = function (req, res) {
    const db = req.app.locals.db;
    const products = db.collection('products').find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.create_an_item = function (req, res) {
    const db = req.app.locals.db;

    var newProduct = new Product(req.body.productCode, req.body.serverName);
    db.collection("products").insertOne(newProduct, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};


// exports.read_an_item = function(req, res) {
//     MenuItem.findById(req.params.itemId, function(err, item) {
//     if (err)
//       res.send(err);
//     res.json(item);
//   });
// };


// exports.update_an_item = function(req, res) {
//     MenuItem.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true}, function(err, item) {
//     if (err)
//       res.send(err);
//     res.json(item);
//   });
// };


// exports.delete_an_item = function(req, res) {


//   Item.remove({
//     _id: req.params.itemId
//   }, function(err, item) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'MenuItem successfully deleted' });
//   });
//};