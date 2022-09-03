"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.covid19Router = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../services/database");
exports.covid19Router = express_1.default.Router();
exports.covid19Router.use(express_1.default.json());
exports.covid19Router.get('/countries', async (req, res, next) => {
    try {
        const countries = await database_1.collections.countries.find({}).toArray();
        res.status(200).send(countries);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.covid19Router.get('/countries/:name', async (req, res, next) => {
    const { name } = req.params;
    if (name) {
        try {
            const country = await database_1.collections.countries.findOne({ name: name });
            res.status(200).send(country);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    else {
        try {
            const countries = await database_1.collections.countries.find({}).toArray();
            res.status(200).send(countries);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
});
exports.covid19Router.get('/articles', async (req, res, next) => {
    try {
        const articles = await database_1.collections.articles.find({}).toArray();
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//# sourceMappingURL=covid19.router.js.map