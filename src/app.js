require('dotenv').config();
const express = require('express');
const MongoDatabase = require('./mongoDatabase.js');


const app = express();

const mongoDatabase = new MongoDatabase();
(async () => {
    await mongoDatabase.connect();
})();


app.get('/country', async (req, res) => {
    try {
        const name = req.query.name;
        const country = await mongoDatabase.getCountry(name);
        delete country['_id'];
        res.send(country);
    } catch (err) {
        res.send({'Error': 'Could not find country'});
    }
});

app.get('/countries', async (req, res) => {
    try {
        const countries = await mongoDatabase.getAllCountries();
        countries.forEach((country) => {
            delete country['_id'];
        });
        res.send(countries);
    } catch (err) {
        res.send({'Error': 'Could not find countries'});
    }
});

app.listen(process.env.PORT);
