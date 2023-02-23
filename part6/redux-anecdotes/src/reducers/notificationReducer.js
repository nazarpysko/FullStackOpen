import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { putNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (msg, seg) => {
    return async dispatch => {
        dispatch(putNotification(msg))
        setTimeout(() => dispatch(clearNotification()), seg * 1000)
    }
}