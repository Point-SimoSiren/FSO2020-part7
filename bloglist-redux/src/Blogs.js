import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import { notificationAction, emptyAction } from './reducers/notificationReducer'
import { positiveAction, negativeAction } from './reducers/positivityReducer'
import { initAction, removeAction, likeAction } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'

/* I have re-named component App to Blogs because I hook all blogs here and loop
them singularly to Blog */

const Blogs = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAction())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

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

  //--------LOGIN-------------------------------

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(positiveAction())
      dispatch(notificationAction('Login was succesfull!'))
      setTimeout(() => {
        dispatch(emptyAction())
      }, 3000)


    } catch (exception) {
      dispatch(positiveAction())
      dispatch(notificationAction('Wrong credentials!'))
      setTimeout(() => {
        dispatch(emptyAction())
      }, 3000)
    }
  }
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

  //----------LIKE-UPDATE------------------------------------

  const like = id => {
    const blog = blogs.find(b => b.id === id)
    let newLikes = blog.likes + 1
    const likedBlog = {
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogsService
      .update(id, likedBlog)
      .then(data => {
        dispatch(likeAction(blogs.map(blog => blog.id !== id ? blog : data)))
      })
      .catch(() => {
        dispatch(negativeAction())
        dispatch(notificationAction(
          `blog '${blog.content}' was already removed from server`
        ))
        setTimeout(() => {
          dispatch(emptyAction)
        }, 3000)
        dispatch(initAction(blogs.filter(b => b.id !== id)))
      })
  }



  //-----------APP.js returns to screen when not logged in------------

  if (user === null) {
    return (
      <div>

        <Notification />

        <h1>Bloglist</h1>

        <Togglable buttonLabel='login'>
          <LoginForm
            handleLoginSubmit={handleLoginSubmit}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>

      </div>
    )
  }
  //---------------RENDER-WHEN-USER-IS-LOGGED-IN----------------
  else {
    return (
      <div>
        <h1>Bloglist</h1>

        <Notification />
        <p>Logged in as {user.username}
          <button style={{ width: "100px", height: "25px", marginLeft: "300px" }}
            onClick={handleLogOut} >
            LOGOUT
          </button></p>

        <Togglable buttonLabel='Add new blog'>
          <BlogForm />
        </Togglable>

        <h2 style={{ color: 'blue' }}>Blog listing</h2>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            handleDeleteClick={handleDeleteClick} />
        )}
      </div>
    )
  }
}

export default Blogs