import { useMutation, useQueryClient } from "react-query"
import { createNote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
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
