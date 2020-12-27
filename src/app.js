require('dotenv').config();
const express = require('express');
const MongoDatabase = require('./mongoDatabase.js');


const app = express();
const mongoDatabase = new MongoDatabase();

app.get('/country', async (req, res) => {
    await mongoDatabase.connect();
    try {
        const name = req.query.name;
        const country = await mongoDatabase.getCountry(name);
        delete country['_id'];
        res.send(country);
    } catch (err) {
        res.send({'Error': 'Could not find country'});
    }
    await mongoDatabase.close();
});

app.get('/countries', async (req, res) => {
    await mongoDatabase.connect();
    try {
        const countries = await mongoDatabase.getAllCountries();
        countries.forEach((country) => {
            delete country['_id'];
        });
        res.send(countries);
    } catch (err) {
        res.send({'Error': 'Could not find countries'});
    }
    await mongoDatabase.close();
});

app.listen(process.env.PORT);
