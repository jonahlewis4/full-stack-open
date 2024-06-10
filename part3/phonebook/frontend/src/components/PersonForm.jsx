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
export default PersonForm