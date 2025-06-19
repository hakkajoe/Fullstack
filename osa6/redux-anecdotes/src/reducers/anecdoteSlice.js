import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(_state, action) {
      return action.payload
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    vote(state, action) {
      const id = action.payload
      const target = state.find(a => a.id === id)
      if (target) target.votes += 1
    }
  }
})

export const { setAnecdotes, appendAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const saved = await create({ content, votes: 0 })
    dispatch(appendAnecdote(saved))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    await update(anecdote.id, updated)
    dispatch(vote(anecdote.id))
  }
}