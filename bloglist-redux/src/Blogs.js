import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import { setUserAction, initUsersAction } from './reducers/userReducer'
import { notificationAction, emptyAction } from './reducers/notificationReducer'
import { positiveAction, negativeAction } from './reducers/positivityReducer'
import { initBlogsAction, removeAction } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import Users from './components/Users'

/* I have re-named this main component App to Blogs */

const Blogs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogsAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsersAction())
  }, [dispatch])

  const user = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserAction(user))
      blogsService.setToken(user.token)
    }
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })


  //------------------DELETE---------------------------

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

  //--- LOGOUT -------------------------------

  const handleLogOut = () => {
    localStorage.clear()

    dispatch(positiveAction())
    dispatch(notificationAction('Logout was succesfull!'))

    setTimeout(() => {
      dispatch(emptyAction())
      window.location.reload()
    }, 3000)
  }


  //-----------APP.js returns to screen when not logged in------------

  if (user === null) {
    return (
      <div>

        <Notification />

        <h1>Bloglist</h1>

        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>

      </div>
    )
  }
  //---------------RENDER-WHEN-USER-IS-LOGGED-IN----------------
  else {
    return (
      <div>
        <h1>Bloglist</h1>

        <p>Logged in as {user.username}
          <button style={{ width: "150px", height: "30px", marginLeft: "300px" }}
            onClick={handleLogOut} >
            LOGOUT
          </button></p>

        <Togglable buttonLabel='Add new blog'>
          <BlogForm />
        </Togglable>

        <h2 style={{ color: 'blue' }}>Blog listing</h2>
        <Notification />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            handleDeleteClick={handleDeleteClick} />
        )}
        <Users />
      </div>
    )
  }
}

export default Blogs