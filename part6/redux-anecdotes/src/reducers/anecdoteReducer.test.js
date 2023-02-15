import deepFreeze from 'deep-freeze'

import anecdoteReducer from './anecdoteReducer'
import { getInitialState } from './anecdoteReducer'

describe('anecdote reducer', () => {
    const initialState = getInitialState()

    test('Can vote an anecdote', () => {
        const state = initialState
        deepFreeze(state)

        const action = {
            type: 'VOTE',
            payload: {
                id: initialState[0].id
            }
        }

        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(state.length)
        console.log(newState[0]);
        expect(newState[0].votes).toEqual(state[0].votes + 1)
    })
})