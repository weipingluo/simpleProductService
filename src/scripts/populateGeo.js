const fs = require('fs');
const csv = require('csv-parser');
import State from '../domain/Network/State';
import Country from '../domain/Network/Country';
import { MongoClient } from 'mongodb';
import config from '../config';

const stateMap = new Map();
const countryMap = new Map();

let db;
let dbClient;

function updateCountries() {
    fs.createReadStream('statecode.csv').pipe(csv()).on('data', function (data) {
        try {
            let state = new State(data.state, data.state_code);
            stateMap.set(data.state, state);
            let country = countryMap.get(data.country);
            if (country === undefined) {
                country = new Country(data.country, data.country_code);
                countryMap.set(data.country, country);
            }
            country.states.push(state.stateName);
            //console.log(`Added ${data.state}`);
        }
        catch (err) {
            console.log(err);
        }
    }).on('end', function () {
        db.collection("countries").insertMany(Array.from(countryMap.values()), function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("Countries in DB.");
            }
        });
    });
}

function updateStates() {
    fs.createReadStream('causcities_asc.csv').pipe(csv()).on('data', function (data) {
        try {
            var state = stateMap.get(data.state);
            if (state === undefined) {
                console.log(`The state is not defined: ${data.state}`);
            } else {
                state.cities.push(data.city);
            }
        }
        catch (err) {
            console.log(err);
        }
    }).on('end', function () {
        Array.from(stateMap.values()).forEach(function(state) {
            state.sortCities();
            db.collection("states").insertOne(state, function (err, result) {
                if (err) {
                    console.error(err);
                }
            });
        });
        console.log("States in DB now!");
        console.log("Close DB link.");
        dbClient.close();
        console.log("Done!");
    });

}

async function run() {
    try {
        const client = await MongoClient
        .connect('mongodb://localhost:27017/', { useNewUrlParser: true, poolSize: 10 });
        db = client.db('bk');
        dbClient = client;
        console.log("Mongo Connected.");
        updateCountries();
        updateStates();

    }
    catch (errr) {

    }
}

run();
