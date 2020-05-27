import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import { setCurrentUserAction, logoutAction } from './reducers/currentUserReducer'
import { initUsersAction } from './reducers/userReducer'
import { notificationAction, emptyAction } from './reducers/notificationReducer'
import { positiveAction, negativeAction } from './reducers/positivityReducer'
import { initBlogsAction, removeAction } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import Users from './components/Users'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom"


const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  /*const match = useRouteMatch('/:id')
  const bloggy = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null*/


  return (
    <div>
      <div>
        <Link style={padding} to="/">Blogs</Link>

        <Link style={padding} to="/users">Users</Link>
      </div>

      <Switch>

        <Route path="/users">
          <Users />
        </Route>

        <Route path="/:id">
          <Blog />
        </Route>

        <Route path="/">
          <Blogs blogs={blogs} />
        </Route>

      </Switch>

    </div>
  )
}

// --------APP-------------------------------

const App = () => {

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(initUsersAction())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUserAction(currentUser))
      blogsService.setToken(currentUser.token)
    }
  }, [dispatch])


  const currentUser = useSelector(({ currentUser }) => {
    return currentUser
  })




  //--- LOGOUT -------------------------------

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(logoutAction())
    dispatch(positiveAction())
    dispatch(notificationAction('Logout was succesfull!'))

    setTimeout(() => {
      dispatch(emptyAction())
      window.location.reload()
    }, 3000)
  }


  //-----------APP.js returns to screen when not logged in------------

  if (!currentUser) {
    return (
      <div>

        <h1>Bloglist</h1>

        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>
        <Notification />
      </div>
    )
  }
  //---------------RENDER-WHEN-USER-IS-LOGGED-IN----------------
  else {
    return (
      <div>
        <h1>Bloglist</h1>

        <p>Logged in as {currentUser.username}
          <button style={{ width: "150px", height: "30px", marginLeft: "300px" }}
            onClick={handleLogOut} >
            LOGOUT
          </button></p>
        <Notification />
        <Menu />
      </div>
    )
  }
}

export default App