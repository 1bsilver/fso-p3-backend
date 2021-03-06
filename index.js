
const express = require('express')
const app = express()

app.use(express.json())

let persons = 
 [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Zlatan Ibrahimovic",
        "number": "9702786031",
        "id": 5
      }
    ]


app.get('/api/persons', (request, response)=> {
    response.json(persons)
    console.log(persons.length)

})

app.get('/info', (request, response)=> {
    response.send(`<p>Phonebook has info for ${persons.length} people<p>
    <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const ID = request.params.id
    const person = persons.find(per => per.id === Number(ID))
    
    person ? response.json(person) : response.status(404).end()

})

const PORT = 3001
app.listen(PORT , ()=> {
    console.log(`Server running on port ${PORT}`)
})