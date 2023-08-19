import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotifcationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const { isLoading, isError, data } = useQuery('anecdotes', getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <span>Loading...</span>
  } else if (isError) {
    return (
      <span>Anecdote service not available due to problems in the server</span>
    )
  }

  const anecdotes = data

  const handleVote = (anecdote) => {
    const anecdoteVoted = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(anecdoteVoted)
    dispatch({ type: 'VOTED', content: anecdote.content })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
