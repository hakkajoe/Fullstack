import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}