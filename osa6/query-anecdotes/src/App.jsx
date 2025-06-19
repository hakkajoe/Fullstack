import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './services/anecdotes'
import { NotificationContext } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const [, dispatchNotification] = useContext(NotificationContext)

  const notify = (text) => {
    dispatchNotification({ type: 'SHOW', payload: text })
    setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
  }

  const {
    data: anecdotes = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`you voted '${saved.content}'`)
    }
  })

  const handleVote = anecdote => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isLoading) return <div>loading data...</div>

  if (isError)
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
