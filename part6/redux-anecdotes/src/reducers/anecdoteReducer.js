import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
  
export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = anecdotes => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

export const getInitialState = () => {
  const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  return sortAnecdotes(anecdotesAtStart.map(asObject))
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      return sortAnecdotes(state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote))
    
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      return sortAnecdotes(state)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer


export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdotesService.getAll()
    return dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(anecdote)
    return dispatch(appendAnecdote(newAnecdote))
  } 
}

export const vote = anecdote => {
  return async dispatch => {
    await anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 })
    return dispatch(addVote(anecdote.id))
  }
}
