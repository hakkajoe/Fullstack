import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteSlice'
import { showNotification } from '../reducers/notificationSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    dispatch(addAnecdote(content))
    dispatch(showNotification(`you added '${content}'`))
    event.target.note.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="note"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
