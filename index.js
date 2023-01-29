const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()

//app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));
app.use(cors())
app.use(express.json())

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const includes = persons.map(person => person.name).includes(body.name)

  
    if (!body.name) {
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
    
    
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
  })


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info',(req, res) => {
  const d = new Date()
  res.send(`<h2>Phonebook has info for ${persons.length} people</h2>${d}`)
}
)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
//antaa yksittäisen
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
     persons = persons.filter(note => note.id !== id)
      
    response.status(204).end()
})

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number:123123
      },
      {
        id: 2,
        content: "Ada Lovelace",
        number: 3
      },
      {
        id: 3,
        content: "Dan bramov",
        number: 12312399
      },
      {
        id: 4,
        content: "Mary Poppendick",
        number: 004005
      }
]

    

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

