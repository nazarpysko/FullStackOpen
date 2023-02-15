import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'

const store = configureStore({ reducer: counterReducer })

const App = () => {
  return (
    <>
      <button onClick={ () => store.dispatch({ type: 'GOOD' }) }> good </button>
      <button onClick={ () => store.dispatch({ type: 'OK' }) }> ok </button>
      <button onClick={ () => store.dispatch({ type: 'BAD' }) }> bad </button>
      <button onClick={ () => store.dispatch({ type: 'ZERO' }) }> zero </button>
      <div>
        good { store.getState().good } <br />
        ok { store.getState().ok } <br />
        bad { store.getState().bad } <br />
      </div>
    </>   
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)