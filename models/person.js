require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidators = [
  {
    validator: (numbers) => {
      if ((numbers[2] === '-' || numbers[3] === '-') && numbers.length < 9) {
        return false
      }
      return true
    },
    msg: 'Number must be 8 digits or longer',
  },
  {
    validator: (numbers) => {
      return /^\d{2,3}-\d+$/.test(numbers)
    },
    msg: 'invalid phone number',
  },
]



const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength: 3,
    required : true,
  },
  number:{
    type:String,
    validate:numberValidators,
    required: true,
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)