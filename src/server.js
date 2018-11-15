import express from 'express';
import { MongoClient } from 'mongodb';
import config from './config';
import { urlencoded, json } from 'body-parser';
import routes from './api/routes/productRoutes'; //importing route

const app = express();
const port = process.env.PORT || 3000;
app.use(urlencoded({ extended: true }));
app.use(json());

routes(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

let dbClient;

MongoClient
    .connect(config.database.url, { useNewUrlParser: true, poolSize: 10 })
    .catch(err => console.error(err.stack))
    .then(client => {
        dbClient = client;
        const db = client.db(config.database.db);
        app.locals.db = db;
    });

process.on('SIGINT', () => {
    dbClient.close();
    console.log("Close db connection.");
    process.exit();
})

app.listen(port, () => {
    console.log(`Node.js app is listening at http://localhost:${port}`);
});
