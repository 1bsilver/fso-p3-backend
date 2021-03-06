
const { response } = require('express')
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

app.delete('/api/persons/:id', (request,response) => {
    const ID = Number(request.params.id)
    persons = persons.filter(per => per.id !== ID)

    response.status(204).end()
})

const generateId = () => {
    const maxID = persons.length > 0 
    ? Math.max(...persons.map(n=>n.id))
    : 0
    return maxID +1
}

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT , ()=> {
    console.log(`Server running on port ${PORT}`)
})
