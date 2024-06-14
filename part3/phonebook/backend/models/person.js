const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => console.log('connected to the database'))
    .catch((err) => console.log("error connecting to database" , err.message));
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})
module.exports = mongoose.model("Person", personSchema)
