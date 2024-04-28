import Note from './components/Note'
import {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './services/notes'




const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  
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
        alert(
          `the note '${note.content}' was already deleted from server`
        )

        setNotes(notes.filter(note => note.id != id))
      })
    
  }
  //if showALL is true, array of notes to show is all of em.
  //if show all is false, array of notes to show is only the important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}


export default App