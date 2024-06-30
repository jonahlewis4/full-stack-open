const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => console.log('connected to the database'))
  .catch((err) => console.log('error connecting to database' , err.message))
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'person\'s name required'],
    minlength: [3, 'Person\'s name must be at least 3 digits']
  },

  number: {
    type: String,
    validate: {
      //validates if we have 2-3 digits followed by a dash followed by at least 1 digit.
      validator: (value) => {
        console.log('running validation for person\'s number', value)
        const isValid =  /^\d{2,3}-\d+$/.test(value)
        console.log(isValid)
        return  isValid && value.length >= 8
      },
      message: props => `${props.value} is not a valid phone number! must be of from 2 to 3 digits followed by - and then at least 1 digit. Total length must be 8 or more`,


    },
    required: [true, 'person\'s phone number required']

  }
})
personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})
module.exports = mongoose.model('Person', personSchema)
