'use strict';
import Country from '../../domain/Network/Country';
import State from '../../domain/Network/State';

exports.list_all_countries = function (req, res) {
    const db = req.app.locals.db;
    const countries = db.collection('countries').find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};


exports.list_all_states = function (req, res) {
    const db = req.app.locals.db;
    const states = db.collection('states').find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.read_a_state = function (req, res) {
    const db = req.app.locals.db;
    const state = db.collection('states').findOne({stateName:req.params.stateName}, function(err, result) {
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