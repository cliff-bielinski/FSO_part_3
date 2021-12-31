const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const [newName, newNumber] = [process.argv[3], process.argv[4]]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.h1lr0.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber
  })

  person.save().then(result => {
    console.log('person added!')
    mongoose.connection.close()
  })
} else {
  console.log('Phonebook')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}