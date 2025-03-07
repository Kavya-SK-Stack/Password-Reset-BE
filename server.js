const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()





const PORT = process.env.PORT || 5002
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})