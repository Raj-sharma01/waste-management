import mongoose from 'mongoose'
import 'dotenv/config'

export const connetDB = () => {
    mongoose.connect(process.env.MONGO_URL)

    mongoose.connection.once('open', () => {
        console.log("Database connected successfully")
    })

    mongoose.connection.on('error', (error) => {
        console.log('oops error ', error)
        console.log('mongoose error')
    })
}