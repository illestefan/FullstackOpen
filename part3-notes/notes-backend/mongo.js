const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

/*
const url =
  `mongodb+srv://fullstack_develop:${password}@si-test-database.4js3bet.mongodb.net/?retryWrites=true&w=majority`
*/

const url = 'mongodb://172.16.17.132:27017/si-test-database'

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


const note = new Note({
  content: 'a second note',
  important: true,
})

/*
note.save()
  .then(result => {
    console.log('note saved!')
    // mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
  })
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})