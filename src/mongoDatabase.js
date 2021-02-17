const {MongoClient} = require('mongodb');
const mongoOptions = {useUnifiedTopology: true};


/**
 * MongoDB
 *
 * @author      Zairon Jacobs <zaironjacobs@gmail.com>
 */
class MongoDatabase {

    /**
     * Return a country
     *
     * @param {string} name
     *
     * @return {object}
     */
    async getCountry(name) {
        return await this.countryCollection.findOne({'name': name});
    }

    /**
     * Return all countries
     *
     * @return {array}
     */
    async getAllCountries() {
        return await this.countryCollection.find({}).toArray();
    }

    /**
     * Return all articles
     *
     * @return {array}
     */
    async getAllArticles() {
        return await this.articleCollection.find({}).toArray();
    }

    /**
     * Connect to the client
     */
    async connect() {
        this.client = new MongoClient(process.env.CONNECTION_STRING, mongoOptions);
        try {
            await this.client.connect();
            this.db = await this.client.db(process.env.DATABASE);
            this.countryCollection = await this.db.collection(process.env.COLLECTION_COUNTRY);
            this.articleCollection = await this.db.collection(process.env.COLLECTION_ARTICLE);
        } catch {
            console.log('Could not connect to MongoDB database');
        }
    }
}

module.exports = MongoDatabase;
