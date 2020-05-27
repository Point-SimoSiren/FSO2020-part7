import React, { useEffect } from 'react'
import Blog from './Blog'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { initBlogsAction, removeAction } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogsAction())
    }, [dispatch])

    const blogs = useSelector(({ blogs }) => {
        return blogs
    })


    const handleDeleteClick = id => {
        const blogToRemove = blogs.find(blog => blog.id === id)
        console.log(blogToRemove.id, blogToRemove.title)
        if (window.confirm(`Removing ${blogToRemove.title}. Are you sure? `)) {
            blogsService
                .remove(id)
                .then(promise => {
                    dispatch(removeAction(blogs.filter(filtered => filtered.id !== id)))
                    if (promise.status === 204) {
                        dispatch(positiveAction())
                        dispatch(notificationAction(`${blogToRemove.title} was deleted from the database.`))
                        setTimeout(() => {
                            dispatch(emptyAction())
                            dispatch(initBlogsAction())
                        }, 3000)
                    }
                })
                .catch(error => {
                    dispatch(negativeAction())
                    console.log('Palvelimen palauttama error: ', error.response.data)
                    dispatch(notificationAction(
                        ` ${error.response.data} OR ${blogToRemove.title} may not have been deleted due unexpected error. Pls. check.`
                    ))
                    setTimeout(() => {
                        dispatch(emptyAction)
                    }, 4000)
                })
        }
    }


    return (
        <>
            <Togglable buttonLabel='Add new blog'>
                <BlogForm />
            </Togglable>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}
                        handleDeleteClick={handleDeleteClick} />
                )
            }
        </>)
}
export default Blogs