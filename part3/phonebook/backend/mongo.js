const mongoose = require('mongoose')

if(process.argv.length < 5){
    console.log('give password, name, number as arguments')
    process.exit(1)

}
const password = process.argv[2]
const url = ``
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

const person = new Person({
    name: passedName,
    number: passedNumber,
})
console.log("added " + person.name + " number " + person.number + " to the phonebook")




Person.find({important: true}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})