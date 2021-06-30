
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
   
  
 
app.use(morgan((tokens,req,res)=>{
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
        
       
      ].join(' ')
}))


// let persons = 
//  [
//       {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//       },
//       {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//       },
//       {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//       },
//       {
//         "name": "Zlatan Ibrahimovic",
//         "number": "9702786031",
//         "id": 5
//       }
//     ]

    

      
app.get('/api/persons', (request, response)=> {
    Person.find({}).then(person => {
        response.json(person)
    })

})

app.get('/info', (request, response)=> {
    response.send(`<p>Phonebook has info for ${persons.length} people<p>
    <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const ID = request.params.id
    Person.findById(ID).then(person=> {
        response.json(person)
    })

})

app.delete('/api/persons/:id', (request,response) => {
    const ID = Number(request.params.id)
    persons = persons.filter(per => per.id !== ID)

    response.status(204).end()
})

// const generateId = () => {
//     const maxID = persons.length > 0 
//     ? Math.max(...persons.map(n=>n.id))
//     : 0
//     return maxID +1
// }

app.post('/api/persons/', (request, response) => {

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

  

    //  if (Person.find({"Name":body.name}).then(result => {
    //     result.forEach(note => {
    //       console.log('same')
    //     })
    //   }))  
    //   { 
    //       return response.status(400).json({
    //         error: 'name must be unique!'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        response.json(result)

    })
    
})

app.use(unknownEndpoint)

const PORT =  process.env.PORT || 3001
app.listen(PORT , ()=> {
    console.log(`Server running on port ${PORT}`)
})