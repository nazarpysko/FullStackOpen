import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })

  const handleVote = anecdote => {
    dispatch(vote(anecdote))

    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification('')), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
        )}
    </div>
  )
}

export default AnecdoteList