import { useState } from 'react'

const People = ({persons}) => {
  return persons.map(person => {
    return <p key = {person.id}>{person.name} {person.number}</p>
  })
}

const SearchFilter = ({value, onChange}) => {
  return (
    <div>
        filter shown with:   
        <input  
              value = {value}
              onChange = {onChange}
        />
    </div>
  )
}
const PersonForm = ({onSubmit, name, number, onChanges}) =>{
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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const [filteredPersons, setFilteredPersons] = useState(persons)
  const addPerson = (event) => {
    event.preventDefault()
    console.log('add number clicked')
  
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons.length + 1
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
const handleSearchKeyChange = (event) => {
  console.log(event.target.value)
  setSearchKey(event.target.value)

  setFilteredPersons(persons.filter(person => person.name.includes(event.target.value)))
}

  return (
    <div>
      <h2>Phonebook</h2>
      
      <SearchFilter value = {searchKey} onChange = {handleSearchKeyChange}/>
      
      <h3>add a new</h3>
      <PersonForm onSubmit = {addPerson} name = {newName} number = {newNum} onChanges = {{handleNameChange, handleNumberChange}}/>
      <h3>Numbers</h3>
      <People persons = {filteredPersons}/>
    </div>
  )
}

export default App