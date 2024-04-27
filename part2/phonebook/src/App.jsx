import { useState } from 'react'

const People = ({persons}) => {
  return persons.map(person => {
    return <p key = {person.name + person.number}>{person.name} {person.number}</p>
  })
}

const Form = ({onSubmit, name, number, onChanges}) =>{
  return (
    <form onSubmit = {onSubmit}>
        <div>
          name: 
          <input  
            value = {name}
            onChange = {onChanges.handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value = {number}
            onChange = {onChanges.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('add number clicked')
  
    const newPerson = {
      name: newName,
      number: newNum
    }

    //if our persons array already contains the given person, do not add it to the array
    console.log(persons)
    if(!persons.some(person => (person.name === newName && person.number === newNum))){
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      console.log(newPersons)
    }
    else
    {
      console.log(persons)
      alert(`${newName} with number ${newNum} is already added to phonebook`)
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>

      <Form onSubmit = {addPerson} name = {newName} number = {newNum} onChanges = {{handleNameChange, handleNumberChange}}/>
      <h2>Numbers</h2>
      <People persons = {persons}/>
    </div>
  )
}

export default App