const express = require('express')
const app = express()

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

// retrieves total number of contacts in phonebook and current server time
app.get('/info', (request, response) => {
  let info = `
    <div>Phonebook has info for ${persons.length} people</div>
    <br>
    <div>${new Date()}</div>
  `

  response.send(info)
})

// server runs locally :3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})