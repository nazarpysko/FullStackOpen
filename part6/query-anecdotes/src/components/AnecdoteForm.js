import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createNote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(anecdote)
    dispatch({ type: 'SHOW', payload: `new anecdote has been created: ${anecdote}` })
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
