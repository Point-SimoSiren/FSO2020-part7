import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    let newState = [...state]
    switch (action.type) {

        case 'INITIALS':
            return action.payload
        default: return state

        case 'CREATE':
            return newState.concat(action.payload)

        case 'REMOVE':
            return newState.concat(action.payload)

        case 'LIKE':
            const id = action.payload.id
            const found = newState.findIndex((blog) => {
                return blog.id === id
            })
            newState[found].votes = newState[found].votes + 1
            return newState
    }
}

//------------------ACTION-CREATORS-------------------

export const createAction = submitted => {
    return async dispatch => {
        const newBlog = await blogService.create(submitted)
        dispatch({
            type: 'CREATE',
            payload: newBlog
        })
    }
}

export const removeAction = (id) => {
    return dispatch => {
        blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            payload: {
                id: id
            }
        })
    }
}

export const likeAction = (id) => {
    return dispatch => {
        blogService.update(id)
        dispatch({
            type: 'LIKE',
            payload: {
                id: id
            }
        })
    }
}

export const initAction = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALS',
            payload: blogs
        })
    }
}

export default blogReducer