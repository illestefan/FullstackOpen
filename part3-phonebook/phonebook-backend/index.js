const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// create a body token for morgan. it will log the body of the request
morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

// define a custom morgan format string which uses the body token
// the output will be similar to this example:
// POST /api/persons 200 71 - 3.603 ms {"name":"Mary Jane Poppins","number":"0039 3876-353435666"}
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// info route
app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.countDocuments({})
    .then(count => {
      console.log('Date:', date)
      console.log('Number of users:', count)
      response.send(
        `
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>
        `
      )
    })
    .catch(error => next(error))
})

// get all persons route
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      console.log('got persons', persons)
      response.json(persons)
    })
    .catch(error => next(error))
})

// get a single person route
app.get('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  console.log(`trying to get person with id: ${id}`)
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log('found person: ', person)
        response.json(person)
      } else {
        response.statusMessage = `Person with id ${id} not found`
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// delete a person route
app.delete('/api/persons/:id', (request, response, next) => {
  console.log('deleting person with id: ', request.params.id)
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(`deleted person with id: ${request.params.id}`, result)
      response.status(204).end()
    })
    .catch(error =>  next(error))
})

// update a person route
app.put('/api/persons/:id', (request, response, next) => {
  console.log('updating person with id: ', request.params.id)
  const body = request.body
  console.log('updating person, body: ', body)

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      console.log('updated person: ', updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => {
      console.log('error updating person: ', error)
      next(error)
    })
})

// add a person route
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('adding a person: ', body)

  // generate a new person object
  const person = new Person({
    name: body.name,
    number: body.number
  })
  // add the new person to the database
  person.save()
    .then(savedPerson => { response.json(savedPerson) })
    .catch(error => next(error))
})

// 404 middleware for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// error handler middleware, has to be added last!
const errorHandler = require('./middleware/errorHandling/errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
