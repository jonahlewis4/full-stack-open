import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import People from './components/People'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [addNotif, setAddNotif] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
        setFilteredPersons(response)
      })
  }, [])


  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('add number clicked')
    
    const newPerson = {
      name: newName,
      number: newNum,
    }


    console.log(persons)
    console.log(newPerson)
    //if the person is compeltely unique, just add it to the array.
    if(!persons.some(person => (person.name === newPerson.name))){
      const newPersons = persons.concat(newPerson)
      //add a new person to the dataserver and update state person array.  
      personService
        .create(newPerson)
        .then((result) => {
          const createdPeople = persons.concat(result)
          setPersons(createdPeople)
          //concatenate the filtered people to include the new person IF it fits in the filter
          setFilteredPersons(newPerson.name.toLowerCase().includes(searchKey.toLowerCase()) ? filteredPersons.concat(result) : filteredPersons)

          console.log(createdPeople)
          //notify the user that the person was added.
          setAddNotif(`Added ${newPerson.name}`)
          setTimeout( () => {
            setAddNotif(null)
          }, 5000) 
        })
    } 
    //else if only the names but not numbers match, confirm if the user iwants to change that person's phone number
    else if (persons.some(person => (person.name === newName && person.number !== newNum))) {
        if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          //update the person on the server.
          
          //identify the person update on database
          const updatedPerson = {...(persons.find((p) => p.name === newPerson.name)), number: newPerson.number}
          console.log(updatedPerson)
          personService
          .update(updatedPerson.id, updatedPerson)
          .then(updatedPerson => {
            //set people to the new one with all the people in it
            console.log(updatedPerson)
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setFilteredPersons(filteredPersons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setAddNotif(`Changed ${newPerson.name}'s number`)
            setTimeout( () => {
              setAddNotif(null)
            }, 5000) 
          })
          //if the user was deleted in the time between clicking add and confirming, display that the person was deleted
          .catch(() => {
            setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
    }
    else //say that the person was already added to the phonebook
    {
      console.log(persons)
      alert(`${newName} with number ${newNum} is already added to phonebook`)
    }
   
  }
  const deletePerson = person => {
    //alert and ask for confirmation that they want the person deleted
    if(confirm(`Delete ${person.name}`)){
      console.log(`Deleting ${person.name}`)
      //delete the person
      personService
        .remove(person)
        .then((result) => {
          //update people state array
          setPersons(persons.filter((p) => p.id != person.id))
          setFilteredPersons(filteredPersons.filter(p => p.id != person.id))
        })
  
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
  console.log(persons)
  setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {addNotif} color = {'green'}/>
      <Notification message = {errorMessage} color = {'red'}/>

      <SearchFilter value = {searchKey} onChange = {handleSearchKeyChange}/>
      
      <h3>add a new</h3>
      <PersonForm onSubmit = {addPerson} name = {newName} number = {newNum} onChanges = {{handleNameChange, handleNumberChange}}/>
      <h3>Numbers</h3>
      {console.log(filteredPersons)}
      <People persons = {filteredPersons} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App