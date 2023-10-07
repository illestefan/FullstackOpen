import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notifcationType, setNotificationType] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initalNotes => {
        console.log(initalNotes)
        setNotes(initalNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNotificationType('success')
        setNotificationMessage(`Added note: '${noteObject.content}'`)
        setTimeout(() => {setNotificationMessage(null)}, 2500)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    
    //debugger
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        setNotificationType('success')
        setNotificationMessage(`Tooggled importance of note: '${changedNote.content}'`)
        setTimeout(() => {setNotificationMessage(null)}, 2500)
      })
      .catch(error => {
        // alert(`the note '${note.content}' was already deleted from server`)
        setNotificationType('error')
        setNotificationMessage(`Note: '${note.content}' was already removed from server`)
        setTimeout(() => {setNotificationMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {setNewNote(event.target.value)}

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notificationMessage} notificationType={notifcationType}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
