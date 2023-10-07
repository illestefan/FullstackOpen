const mongoose = require('mongoose')

const l = process.argv.length
let name = ''
let number = ''

if (l<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (!l in [3,5]) {
    console.log('give password and name/number as argument')
    process.exit(1)
}

const password = process.argv[2]
if (l > 3) {
    name = process.argv[3]
    number = process.argv[4]
}

const url = `mongodb+srv://fullstack_develop:${password}@cluster0.iew5yv4.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

if (! (number || name)) {
    const Person = mongoose.model('Person', PersonSchema)
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        console.log('persons listed!')
        mongoose.connection.close()
    })
} else {
    const Person = mongoose.model('Person', PersonSchema)
    const person = new Person({
        name: name,
        number: number,
        id: Math.floor(Math.random() * 10000)
    })
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
