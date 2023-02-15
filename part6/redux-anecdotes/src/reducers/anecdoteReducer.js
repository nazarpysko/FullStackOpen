const getId = () => (100000 * Math.random()).toFixed(0)
  
const asObject = (anecdote) => {
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

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      anecdote: anecdote
    }
  }
}

const reducer = (state = getInitialState(), action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      return sortAnecdotes(state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote))

    case 'NEW_ANECDOTE':
      const anecdote = action.payload.anecdote
      return sortAnecdotes(state.concat(asObject(anecdote)))

    default:
      return state
  }
}

export default reducer