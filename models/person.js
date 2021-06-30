const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connection to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(result => {
    console.log('Connected to MongoDB')
})
.catch((error)=> {
    console.log('error connecting to MongoDB', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)
