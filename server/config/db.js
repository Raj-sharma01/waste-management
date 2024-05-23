import mongoose from 'mongoose'

export const connetDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/WMS')

    mongoose.connection.once('open', () => {
        console.log("Database connected successfully")
    })

    mongoose.connection.on('error', (error) => {
        console.log('oops error ', error)
        console.log('mongoose error')
    })
}