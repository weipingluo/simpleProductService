import express from 'express';
import Promise from 'bluebird';
import { MongoClient } from 'mongodb';
import config from './config';
import { urlencoded, json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
app.use(urlencoded({ extended: true }));
app.use(json());

import routes from './api/routes/productRoutes'; //importing route
routes(app);
//app.use('/api/users', require('./api/users'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

MongoClient.connect(config.database.url, { promiseLibrary: Promise, useNewUrlParser: true })
  .catch(err => console.error(err.stack))
  .then(db => {
    app.locals.db = db;
    app.listen(port, () => {
      console.log(`Node.js app is listening at http://localhost:${port}`);
    });
  });