import { useDispatch } from "react-redux"

import anecdotesService from '../services/anecdotes.js'

import { appendAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

    
  const addAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdotesService.createNew(anecdote)

    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`New anecdote has been created: ${anecdote}`))
    setTimeout(() => dispatch(clearNotification('')), 5000)
  }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ addAnecdote }>
                <div><input name='anecdote' /></div>
                <button type='submit'> create </button>
            </form>
        </div>
    )
}

export default AnecdoteForm