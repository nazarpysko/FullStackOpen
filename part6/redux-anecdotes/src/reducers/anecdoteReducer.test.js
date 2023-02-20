import deepFreeze from 'deep-freeze'

import anecdoteReducer, { getInitialState } from './anecdoteReducer'

describe('anecdote reducer', () => {
    const initialState = getInitialState()

    test('Can vote an anecdote', () => {
        const state = initialState
        deepFreeze(state)

        const action = {
            type: 'anecdotes/vote',
            payload: initialState[0].id
        }

        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(state.length)
        expect(newState[0].votes).toEqual(state[0].votes + 1)
    })

    test('Can add an anecdote', () => {
        deepFreeze(initialState)

        const action = {
            type: 'anecdotes/createAnecdote',
            payload: 'Hello world!'
        }

        const newState = anecdoteReducer(initialState, action)
        expect(newState).toHaveLength(initialState.length + 1)
        
        const isFound = newState.some(element => element.content === action.payload)
        expect(isFound).toBe(true)
    })
})