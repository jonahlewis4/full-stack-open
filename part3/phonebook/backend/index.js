const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const {token} = require("morgan");
const cors  = require('cors')



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

//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(morgan((tokens, req, res) => {
   if(req.method !== 'POST'){
       return (tokens.method(req, res) + " " + tokens.url(req, res) + " " + tokens.status(req, res) +  " " + tokens['response-time'](req, res) + "ms")
   }
    return (tokens.method(req, res) + " " + tokens.url(req, res) + " " + tokens.status(req, res) + " " + tokens['response-time'](req, res) + "ms " + JSON.stringify(req.body))

}))

app.get('/', (request, response) => {
    response.send('<h1>Visit /api/persons to get the pepole<h1>')
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {
    const dateTime = new Date()
    response.send(
    `
    <p> 
        Phonebook has info for ${persons.length} people 
    </p> 
    <p> 
        ${dateTime}
    </p>
    `
    )
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let id = Math.floor(Math.random() * 10000)
    while(persons.some(person => person.id === id
    )){
        id = Math.floor(Math.random() * 10000)
    }
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body){
        return response.status(400).json({
            error: `unable to find request body`
        })
    }
    else if(!body.name){
        return response.status(400).json({
            error: `name missing`
        })
    }
    else if(!body.number){
        return response.status(400).json({
            error: `number missing`
        })
    }
    //if there already exists someone with the same name in the place
    else if(persons.some(person => person.name === body.name)){
        //respond with an error
        return response.status(403).json({
            error: `name must be unique`
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'})
}
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
