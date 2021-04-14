const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[3]

const url = `mongodb+srv://fullstack:${password}@cluster0.fyvhy.mongodb.net/notebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify:false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 4) {
const person = new Person({
    name: process.argv[4],
    number: process.argv[5],
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})
}

else {

    console.log("phonebook:")

    Person.find({}).then(result => 
        {
            result.forEach(person => {
                console.log(person.name + ' ' + person.number)
            })
            mongoose.connection.close()
        })
}
