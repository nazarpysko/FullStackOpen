import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createNote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const sendNotification = msg => {
    dispatch({ type: 'SHOW', payload: msg })
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
  }

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      sendNotification(`new anecdote has been created: ${anecdote.content}`)
    },
    onError: () => {
      sendNotification('anecdote too short. Must be 5 character length or more')
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(anecdote)
    
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
