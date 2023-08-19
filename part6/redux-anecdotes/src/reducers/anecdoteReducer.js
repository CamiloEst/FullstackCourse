import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.get(id)
    const votedAnecdote = await anecdoteServices.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer