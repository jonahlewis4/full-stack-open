const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password, name, number as arguments')
  console.log('give only the password to see entire database')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://jonahnlewis4:${password}@cluster0.o3hotgu.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
const passedName = process.argv[3]
const passedNumber = process.argv[4]


mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// const note = new Note({
//     content: 'HTML is easy',
//     important: true,
// })
//
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })
if(process.argv.length === 5) {
  const person = new Person({
    name: passedName,
    number: passedNumber,
  })
  person.save().then(() => {
    console.log('added ' + person.name + ' number ' + person.number + ' to the phonebook')
    mongoose.connection.close()
  })
}


if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}