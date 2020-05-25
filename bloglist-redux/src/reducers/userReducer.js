import usersService from '../services/users'

const userReducer = (state = null, action) => {
    switch (action.type) {

        case 'SETUSER':
            return action.payload
        default: return state

        case 'INIT':
            return action.payload
    }
}

//------------------ACTION-CREATOR-------------------

export const setUserAction = user => {
    return async dispatch => {
        dispatch({
            type: 'SETUSER',
            payload: user
        })
    }
}

export const initUsersAction = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'INIT',
            payload: users
        })
    }
}


export default userReducer