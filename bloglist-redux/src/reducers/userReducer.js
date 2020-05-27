import usersService from '../services/users'

const userReducer = (state = [], action) => {
    switch (action.type) {

        case 'INIT':
            return action.payload
        default: return state
    }
}

//------------------ACTION-CREATOR-------------------


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