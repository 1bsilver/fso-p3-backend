
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(morgan((tokens,req,res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)


  ].join(' ')
}))


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)

  })
    .catch(error => next(error))
})

app.get('/info', (request, response,error) => {
  Person.countDocuments({}).then(count =>
    response.send(`<p>Phonebook has info of ${count} people</p>
    <p>${Date()}</p>`))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const ID = request.params.id
  Person.findById(ID).then(person => {
    response.json(person)
  })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request,response, next) => {
  const ID = (request.params.id)
  Person.findByIdAndRemove(ID)
    .then(result => {
      response.status(204).end()

    })
    .catch(error => next(error))
})


app.post('/api/persons/', (request, response, next) => {

  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    response.json(result)
  }).catch( error => {
    console.log(error)
    next(error)
  })


})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findOneAndUpdate({ 'name':body.name }, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error : error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT =  process.env.PORT || 3001
app.listen(PORT , () => {
  console.log(`Server running on port ${PORT}`)
})