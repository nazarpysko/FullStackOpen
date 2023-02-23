import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const asObject = anecdote => {
    return {
        content: anecdote,
        votes: 0,
        id: (100000 * Math.random()).toFixed(0)
    }
}

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNote = async anecdote => {
    const response = await axios.post(baseUrl, asObject(anecdote))
    return response.data
}

export const updateNote = async anecdote => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}