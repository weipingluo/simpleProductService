'use strict';
import Product from '../../domain/product/Product';

exports.list_all_products = function (req, res) {
    const db = req.app.locals.db;
    const products = db.collection('products').find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.create_a_product = function (req, res) {
    const db = req.app.locals.db;

    var newProduct = new Product(req.body.productCode, req.body.serverName);
    db.collection("products").insertOne(newProduct, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};


exports.read_a_product = function (req, res) {
    const db = req.app.locals.db;
    var product = db.collection("products").findOne({ productCode: req.params.productCode }, function (err, result) {
        if (err) {
            res.send(err);
        }
        if (result === null) {
            res.status(404);
            res.send({ error: 'Not found' });
        } else {
            res.json(result);
        }
    });
};


exports.update_a_product = function (req, res) {
    const db = req.app.locals.db;
    var newProduct = new Product(req.body.productCode, req.body.serverName);
    console.log(newProduct);
    var product = db.collection("products")
        .updateOne(
            { productCode: req.params.productCode },
            {$set: newProduct},
            function (err, result) {
                if (err) {
                    res.send(err);
                }
                res.json(result);
            });
};


exports.delete_a_product = function (req, res) {
    const db = req.app.locals.db;
    db.collection("products").deleteOne({ productCode: req.params.productCode }, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};