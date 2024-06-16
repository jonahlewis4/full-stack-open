const express = require('express')
const app = express()
const morgan = require('morgan')
const cors  = require('cors')
const Person = require('./models/person')
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan((tokens, req, res) => {
   if(req.method !== 'POST'){
       return (tokens.method(req, res) + " " + tokens.url(req, res) + " " + tokens.status(req, res) +  " " + tokens['response-time'](req, res) + "ms")
   }
    return (tokens.method(req, res) + " " + tokens.url(req, res) + " " + tokens.status(req, res) + " " + tokens['response-time'](req, res) + "ms " + JSON.stringify(req.body))

}))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => response.json(people))
})
app.get('/info', (request, response) => {
    const dateTime = new Date()
    Person.countDocuments()
        .then(count => {
            response.send(
        `
                <p> 
                    Phonebook has info for ${count} people 
                </p> 
                <p> 
                    ${dateTime}
                </p>
            `
            )
        })

})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
        .catch(err => next(err))
})

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
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedNote => {
        response.json(savedNote)
    })

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
const errorHandler = (error, request, response, next) => {
    console.log(error.message)
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
