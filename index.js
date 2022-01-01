require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// HTTP request logging in terminal
morgan.token('content', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

// retrieves full contact list of phonebook
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// retrieves specific contact for a given id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// retrieves total number of contacts in phonebook and current server time
app.get('/info', (request, response) => {
  Person.count({}).then(count => {
    let info = `
      <div>Phonebook has info for ${count} people</div>
      <br>
      <div>${new Date()}</div>
    `
    response.send(info)
  })
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

// server runs on port defined in .env
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
