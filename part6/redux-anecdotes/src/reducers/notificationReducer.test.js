import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification reducer', () => {
    const initialState = ''
    test('notification is set', () => {
        const state = initialState
        deepFreeze(initialState)

        const action = {
            type: 'notification/setNotification',
            payload: 'this is a msg for the notification component'
        }

        const newState = notificationReducer(state, action)
        expect(newState).toBeTruthy()
        expect(newState).toEqual(action.payload)
    })

    test('notification is cleared', () => {
        const state = 'Hello world!'
        deepFreeze(state)

        const action = {
            type: 'notification/clearNotification',
            payload: ''
        }

        const newState = notificationReducer(state, action)
        expect(newState).toBeFalsy()
        expect(newState).toEqual('')
    })
})