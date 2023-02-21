import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdotesService from './services/anecdotes'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App