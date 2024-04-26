import { useState } from 'react'

const Names = ({persons}) => {
  return persons.map(person => {
    return <p key = {person.name}>{person.name}</p>
  })
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('add number clicked')
  
    const newNumber = {
      name: newName
    }

    //if our persons array already contains the given name, do not add it to the array
    if(!persons.some(person => person.name === newName)){
      const newPersons = persons.concat(newNumber)
      setPersons(newPersons)
      console.log(newPersons)
    }
    else
    {
      console.log(persons)
      alert(`${newName} is already added to phonebook`)
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: 
          <input  
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons = {persons}/>
    </div>
  )
}

export default App