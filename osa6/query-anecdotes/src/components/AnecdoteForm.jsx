import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { createAnecdote } from '../services/anecdotes'
import { NotificationContext } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, dispatchNotification] = useContext(NotificationContext)

  const notify = (text) => {
    dispatchNotification({ type: 'SHOW', payload: text })
    setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`you added '${saved.content}'`)
    },
    onError: (error) => {
      notify(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length < 5) {
      notify('too short anecdote, must have length 5 or more')
      return
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
