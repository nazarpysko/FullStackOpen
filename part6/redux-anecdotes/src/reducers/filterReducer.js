const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return 'ALL'
    }
}

export const filterChange = filter => {
    return {
        type: filter === '' ? 'ALL' : 'SET_FILTER',
        payload: filter.toLowerCase()
    }
}

export default filterReducer