const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())

// HTTP request logging in terminal
morgan.token('content', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

// generates random ID number
const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

// dummy data set containing contact information for phonebook
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// retrieves full contact list of phonebook
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// retrieves specific contact for a given id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(`Fetching contact with id: ${id}`)
  const person = persons.find(person => person.id === id)
  
  // returns matching contact or 404 if not found
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// retrieves total number of contacts in phonebook and current server time
app.get('/info', (request, response) => {
  let info = `
    <div>Phonebook has info for ${persons.length} people</div>
    <br>
    <div>${new Date()}</div>
  `

  response.send(info)
})

// adds new contact to phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Attempting to add:', body)

  // if incomplete or duplicate contact information posted, return error
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'contact information incomplete'
    })
  } else if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'contact name must be unique'
    })
  }

  personObject = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(personObject)

  response.json(personObject)
})

// deletes contact of given id from phonebook
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(`Deleting contact with id: ${id}`)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// server runs locally on port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
