import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export const updateAnecdote = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}