import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateNote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const App = () => {
  const queryClient = new useQueryClient()

  const voteAnecdoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote services are not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      <br />

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

export default App
