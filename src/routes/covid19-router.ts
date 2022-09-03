import express, { Request, Response } from 'express'
import { collections } from '../services/database'

export const covid19Router = express.Router()

covid19Router.use(express.json())

covid19Router.get('/countries', async (req: Request, res: Response) => {
    try {
        const countries = await collections.countries.find({}).toArray()
        res.status(200).send(countries)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

covid19Router.get('/countries/:name', async (req: Request, res: Response) => {
    const { name } = req.params
    if (name) {
        try {
            const country = await collections.countries.findOne({ name: name })
            res.status(200).send(country)
        } catch (error) {
            res.status(500).send(error.message)
        }
    } else {
        try {
            const countries = await collections.countries.find({}).toArray()
            res.status(200).send(countries)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
})

covid19Router.get('/articles', async (req: Request, res: Response) => {
    try {
        const articles = await collections.articles.find({}).toArray()
        res.status(200).send(articles)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
