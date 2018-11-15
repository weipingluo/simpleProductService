/**
 * A Product Object
 *
 * @export
 * @class Product
 */
const uuidv1 = require('uuid/v1');
import FlightDate from '../shared/FlightDate';
export default class Product {

    /**
     * Creates an instance of Product.  ProductCode is a unique key of the product. If not given, it will use an auto generated UUID.
     * @param {*} [productCode=uuidv1()]
     * @param {string} [serverName=""]
     * @memberof Product
     */
    constructor(productCode = uuidv1(), serverName="") {
        this.productCode = productCode;
        this.serverName = serverName;
        this.displayNames = new Object();
        this.price = [];
    }
    
    /**
     * Get/set the display names of a product. 
     * displayName() returns JSON string of displayNames
     * displayName(langCode) returns the displayName in that langCode
     * displayName(langCode, name) sets the displayName in that langCode
     * 
     * @param {*} langCode
     * @param {*} name
     * @returns  
     * @memberof Product
     */
    displayName(langCode, name) {
        if (typeof langCode == 'undefined' && typeof name == 'undefined') {
            return JSON.stringify(this.displayNames);
        }

        if (typeof name == 'undefined') {
            return this.displayNames[langCode.toLowerCase()];
        } 
        this.displayNames[langCode.toLowerCase()] = name;
    }

    addPrice(value, flightDate=FlightDate.FOREVER) {
        var newPrice = new Object();
        newPrice.value = value;
        newPrice.flightDate = flightDate;
        this.price.push(newPrice);
    }

    getPrice(date) {
        for (let i = 0; i < this.price.length; i++) {
            let pr = this.price[i];
            if (pr.flightDate.isInside(date)) {
                return pr.value;
            }
        }
        return "n/a";
    }

}
