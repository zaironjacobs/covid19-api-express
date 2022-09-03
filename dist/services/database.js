"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongodb_1 = require("mongodb");
exports.collections = {};
async function connectToDatabase() {
    const client = new mongodb_1.MongoClient(process.env.CONNECTION_STRING);
    await client.connect();
    const db = client.db(process.env.DATABASE);
    const countriesCollection = db.collection(process.env.COLLECTION_COUNTRY);
    const articlesCollection = db.collection(process.env.COLLECTION_ARTICLE);
    exports.collections.countries = countriesCollection;
    exports.collections.articles = articlesCollection;
    console.log('Connected to database');
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map