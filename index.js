const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));


  //pyynnöt
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    //const includes = Person.map(person => person.name).includes(body.name)

  
    /*if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(includes){
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    */
    
    const person = new Person( {
      //id: generateId(),
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info',(req, res) => {
  const d = new Date()
  Person.find({}).then(persons => {
    res.send(`<h2>Phonebook has info for ${persons.length} people</h2>${d}`)
  })
}
)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})
//antaa yksittäisen
app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id)
    .then(person => {
      if(person){
      response.json(person)
      }else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response,next) => {
   Person.findByIdAndRemove(request.params.id)
   .then(result => {
    response.status(204).end()
   })
   .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person ={
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id,person,{new:true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)
    

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

