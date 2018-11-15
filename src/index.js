const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import FlightDate from './domain/shared/FlightDate';
import Product from './domain/product/Product';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'bk';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);

    var prod = new Product(2, "Test Product");
    prod.displayName("en", "EN Name");

    var fd = new FlightDate("2018-01-01", "2018-01-31");
    prod.addPrice("1.99", fd);
    prod.displayName("fr", "FR Name");
    prod.isavailable = false;

    dbo.collection("products").insertOne(prod, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

