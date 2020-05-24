import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { notificationAction, emptyAction } from './notificationReducer'
import { positiveAction, negativeAction } from './positivityReducer'

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
            newState[found].likes = newState[found].likes + 1
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

export const likeAction = (blog) => {
    return dispatch => {
        blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE',
            payload: {
                id: blog.id,
                blog: blog
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