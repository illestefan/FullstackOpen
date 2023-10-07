const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// create a body token for morgan. it will log the body of the request
morgan.token('body', function (req) {
    return JSON.stringify(req.body);
});

// define a custom morgan format string which uses the body token
// the output will be similar to this example:
// POST /api/persons 200 71 - 3.603 ms {"name":"Mary Jane Poppins","number":"0039 3876-353435666"}
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// info route
app.get('/info', (request, response) => {
    const date = new Date()
    const personsCount = Person.length
    console.log('count: ', personsCount)
    response.send(
        `
        <p>Phonebook has info for ${personsCount} people</p>
        <p>${date}</p>
        `
    )
})

// get all persons route
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log('got persons', persons)
        response.json(persons)
    })
})

// get a single person route
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    Person.findById(request.params.id)
    .then(person => {
        console.log('found person: ', person)
        response.json(person)
    })
    .catch(error => {
        console.log(error)
        response.statusMessage = `Person with id ${id} not found`
        response.status(404).end()
    })
})

// delete a person route
app.delete('/api/persons/:id', (request, response) => {
    console.log('deleting person with id: ', request.params.id)
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        console.log(error)
        response.statusMessage = `Person with id ${id} not found`
        response.status(404).end()
    })
})

// add a person route
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('adding a person: ', body)

    // if name or number is missing, return an error
    if (!body.name) {
        response.statusMessage = 'name missing'
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if (!body.number) {
        response.statusMessage = 'number missing'
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    // generate a new person object
    const person = new Person({
        name: body.name,
        number: body.number
    })
    // add the new person to the database
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })  
})

// 404 middleware for unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
