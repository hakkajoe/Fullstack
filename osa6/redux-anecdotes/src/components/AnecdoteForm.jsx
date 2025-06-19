import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notificationSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 10))
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
