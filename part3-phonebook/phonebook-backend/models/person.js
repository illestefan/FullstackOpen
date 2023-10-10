require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

function isValidPhoneNumber(phoneNumber) {
  // check if the phone number has a minimum length of 8 characters
  if (phoneNumber.length < 8) return false

  // split the phone number at the '-' to check if we have two parts separated by '-'
  const parts = phoneNumber.split('-')

  // check parts.length to see if we have exactly two parts
  if (parts.length !== 2) return false

  // get the two parts to check them further with regex
  const [firstPart, secondPart] = parts

  // check if part 1 has two or three digits
  if (!/^\d{2,3}$/.test(firstPart)) return false

  // check if part2 only consists of digits
  if (!/^\d+$/.test(secondPart)) return false

  // if we finally made it to here it seems to be a correct phone number...
  return true
}


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB, result: ', result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: isValidPhoneNumber,
      message: props => `${props.value} is no valid phone number!`
    },
    required: [true, 'a phone number is required!']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log('transforming', returnedObject)
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
