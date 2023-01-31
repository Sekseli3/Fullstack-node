const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]


const url =
  `mongodb+srv://Sekseli3:${password}@cluster0.rboijgu.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})

{newName ?
  person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
  :
  console.log('phonebook:')
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
}



