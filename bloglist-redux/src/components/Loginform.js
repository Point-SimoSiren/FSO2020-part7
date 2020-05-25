import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { setUserAction } from '../reducers/userReducer'


const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

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
            dispatch(setUserAction(user))
            setUsername('')
            setPassword('')
            dispatch(positiveAction())
            dispatch(notificationAction('Login was succesfull!'))
            setTimeout(() => {
                dispatch(emptyAction())
            }, 3000)


        } catch (exception) {
            dispatch(negativeAction())
            dispatch(notificationAction('Wrong credentials!'))
            setTimeout(() => {
                dispatch(emptyAction())
            }, 3000)
        }
    }


    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLoginSubmit}>
                <div>
                    username
                    <input
                        value={username} autoComplete={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                        <input
                        type="password"
                        value={password} autoComplete={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleUsernameChange: PropTypes.func,
    handlePasswordChange: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string
}

export default LoginForm