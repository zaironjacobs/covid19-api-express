import * as dotenv from 'dotenv'
import express from 'express'
import { connectToDatabase } from './services/database'
import { covid19Router } from './routes/covid19-router'

dotenv.config()

const app = express()

connectToDatabase()
    .then(() => {
        app.use('/', covid19Router)
        app.listen(process.env.PORT, () => {
            console.log(`Server started at http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error)
        process.exit()
    })
