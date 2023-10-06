const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const app = express()

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

// generate a random id between 1 and 1000000 for a new person
function generateId() {
    const id = Math.floor(Math.random() * 1000000)
    return id
}

// info route
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `
    )
})

// get all persons route
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get a single person route
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => {
        return person.id === id
    })
    console.log(person)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = `Person with id ${id} not found`
        response.status(404).end()
    }
})

// delete a person route
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {
        persons = persons.filter(persons => persons.id !== id)
        response.status(204).end()
    } else {
        response.statusMessage = `Person with id ${id} not found`
        response.status(404).end()
    }
    console.log(persons)
})

// add a person route
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

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

    // if the name already exists, return an error
    const personExists = persons.find(person => {
        return person.name === body.name
    })
    if (personExists) {
        response.statusMessage = 'name must be unique'
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    // generate a new person object
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    // add the new person to the persons array
    persons = persons.concat(person)
    console.log(person)
    // return the new person
    response.json(person)
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
