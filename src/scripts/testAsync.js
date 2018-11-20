const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

let db;
let dbClient;


function updateCountries() {
    fs.createReadStream('statecode_example.csv').pipe(csv()).on('data', function (data) {
        try {
            console.log(`Added ${data.state}`);
        }
        catch (err) {
            console.log(err);
        }
    }).on('end', function () {
        console.log("Read Countries!");
    });
}

function updateStates() {
    fs.createReadStream('city_example.csv').pipe(csv()).on('data', function (data) {
        try {
            console.log("read city");
        }
        catch (err) {
            console.log(err);
        }
    }).on('end', function () {
        console.log("Read states!");
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
        console.log("I am done.");
    }
    catch (errr) {

    }
}

run();
