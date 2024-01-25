const mongoose = require('mongoose')

const mongoConfig = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected on: ', result.connection.host)
    } catch(err) {
        console.log('mongo error: ', err)
    }
}

module.exports = mongoConfig