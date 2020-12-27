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
     */
    async getCountry(name) {
        return await this.collection.findOne({'name': name});
    }

    /**
     * Return all countries
     *
     */
    async getAllCountries() {
        return await this.collection.find({}).toArray();
    }

    /**
     * Connect to the client
     */
    async connect() {
        this.client = new MongoClient(process.env.CONNECTION_STRING, mongoOptions);
        try {
            await this.client.connect();
            this.db = await this.client.db(process.env.DATABASE);
            this.collection = await this.db.collection(process.env.COLLECTION);
        } catch {
            console.log('Could not connect to MongoDB database');
        }
    }

    /**
     * Close the client
     */
    async close() {
        await this.client.close();
    }
}

module.exports = MongoDatabase;
