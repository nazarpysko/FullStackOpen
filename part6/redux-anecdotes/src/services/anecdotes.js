import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async anecdote => {
  const response = await axios.post(baseUrl, asObject(anecdote))
  return response.data
}

const update = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

// eslint-disable-next-line
export default { getAll, createNew, update }