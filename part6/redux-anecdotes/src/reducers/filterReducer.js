import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            return action.payload === '' ? 'ALL' : action.payload.toLowerCase()
        }
    }
})

// const filterReducer = (state = 'ALL', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return 'ALL'
//     }
// }

// export const filterChange = filter => {
//     return {
//         type: filter === '' ? 'ALL' : 'SET_FILTER',
//         payload: filter.toLowerCase()
//     }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer