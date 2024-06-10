const People = ({persons, deletePerson}) => {
    return persons.map(person => {
      return (
      <div key = {person.id}>
        {person.name} {person.number} {` `} 
        <button onClick = {() => deletePerson(person)}>delete</button>
      </div>
      )
    })
  }
  export default People