import { Collection, MongoClient } from 'mongodb'

export const collections: { countries?: Collection; articles?: Collection } = {}

export async function connectToDatabase() {
    const client = new MongoClient(process.env.CONNECTION_STRING as string)

    await client.connect()

    const db = client.db(process.env.DATABASE)

    const countriesCollection = db.collection(process.env.COLLECTION_COUNTRY as string)
    const articlesCollection = db.collection(process.env.COLLECTION_ARTICLE as string)

    collections.countries = countriesCollection
    collections.articles = articlesCollection

    console.log('Connected to database')
}
