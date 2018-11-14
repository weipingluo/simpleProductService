import FlightDate from '../shared/FlightDate';
import Product from '../product/Product';
var assert = require('assert');
var expect = require("chai").expect;

describe('Product', function() {
    describe('displayName()', function(){
        it ('should add displayname in the displayNames object', function() {
            var prod = new Product(1, "Test Product");
            assert.equal(typeof prod.displayName("en"), 'undefined');
            prod.displayName("en", "EN Name");
            assert.equal(prod.displayName(), '{"en":"EN Name"}');
            assert.equal(prod.displayName("en"), "EN Name");
            prod.displayName("fr", "FR Name");
            assert.equal(prod.displayName("fr"), "FR Name");
            prod.displayName("en", "Another EN Name");
            assert.equal(prod.displayName("en"), "Another EN Name");
            prod.displayName("EN", "EN NAME ALL UPPERCASE");
            assert.equal(prod.displayName("en"), "EN NAME ALL UPPERCASE");
        });
    });
    describe('addPrice', function(){
        it ('should add a price with value and flightdate', function() {
            var prod = new Product(1, "Test Product");
            var fd = new FlightDate("2018-01-01", "2018-01-31");
            prod.addPrice("1.99", fd);
            assert.equal(prod.price.length, 1);
            assert.equal(prod.getPrice("2018-01-15"), "1.99");
            assert.equal(prod.getPrice("2018-02-15"), "n/a");
        });
    });

});