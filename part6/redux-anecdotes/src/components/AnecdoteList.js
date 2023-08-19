import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const Anecdote = ({ id, content, votes, handleVote }) => {
  return (
    <>
      <div>{content}</div>
      <div>
        has {votes} votes
        <button onClick={() => handleVote(content, id)}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter === ''
      ? anecdotes
      : anecdotes.filter((a) => a.content.toUpperCase().includes(filter))
  )

  const dispatch = useDispatch()

  const vote = (content, id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`, 5))
  }
  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleVote={vote}
            id={anecdote.id}
          />
        ))}
    </>
  )
}

export default AnecdoteList
