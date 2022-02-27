const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    var responsestring = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
    if((tokens.method(req, res)) === 'POST') {
        return responsestring + " " + JSON.stringify(req.body)
    } else {
        return responsestring
    }
  }))

app.use(express.json()) 
app.use(express.static('build'))

let persons = [
          { 
            id: 1,
            name: "Arto Hellas", 
            number: "040-123456"
          },
          { 
            id: 2,
            name: "Ada Lovelace", 
            number: "39-44-5323523"
          },
          { 
            id: 3,
            name: "Dan Abramov", 
            number: "12-43-234345"
          },
          { 
            id: 4,
            name: "Mary Poppendick", 
            number: "39-23-6423122"
          }
  ]

  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (req, res) => {
      var info = 'Phonebook has info for ' + persons.length + ' people'
      var date = new Date()
      res.send(info + '</br></br>' + date)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id =  Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(!person) {
        res.status(404).json({
            error: 'person not found'
        })
    } else {
    res.json(person)
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 500)

    if ((!person.name) || (!person.number)) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }
    const names = persons.map(persons => persons.name)
    
    if(names.includes(person.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }

    res.json(person)
  })

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)