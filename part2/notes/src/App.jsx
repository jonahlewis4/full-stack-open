import Note from './components/Note'
import {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    //console.log('effect')
    noteService
      .getAll()
      .then( initialNotes=> {
        //console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])

  //console.log(notes)
  //console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  
    const noteObject = {
      content: newNote,
      important: Math.random()< 0.5,
    }
    

      noteService.create(noteObject)
      .then(newNote => {
        console.log('posting to notes database')
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)  

    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    //console.log(url, note, changedNote, id)
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => { 
          console.log(n.id, id)
          return n.id !== id ? n : returnedNote
        }
        ))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(note => note.id != id))
      })
    
  }
  //if showALL is true, array of notes to show is all of em.
  //if show all is false, array of notes to show is only the important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map( (note) => 
          <Note 
            key = {note.id} 
            note = {note} 
            toggleImportance = {() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input 
          value = {newNote}
          onChange = {handleNoteChange}
        />
        <button type = "submit">save</button>
      </form>
      <Footer />
    </div>
  )
}


export default App