import { getUsersInfo } from "../services/users";

const initialState = [];

const usersReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_USERS':
            return action.users;
        default:
            return state;
    }
}

const setUsers = users => {
    return {
        type: 'SET_USERS',
        users
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await getUsersInfo();
        dispatch(setUsers(users))
    }
}

export default usersReducer;