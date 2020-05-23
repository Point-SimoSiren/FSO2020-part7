import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { createAction } from '../reducers/blogReducer'

const BlogForm = () => {

    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        let newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
            user: 'Simo'//user.name
        }
        try {

            dispatch(createAction(newBlog))
            dispatch(positiveAction())
            dispatch(notificationAction(`Blog ${newBlog.title} added`))
            setTimeout(() => {
                dispatch(emptyAction())
            }, 5000)
        }
        catch {
            dispatch(negativeAction())
            dispatch(notificationAction('error happened'))
            setTimeout(() => {
                dispatch(emptyAction())
            }, 3000)
        }
        finally {
            setNewAuthor('')
            setNewTitle('')
            setNewUrl('')
        }
    }



    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')

    return (
        <form onSubmit={addBlog}>
            <div>
                title: <input type="text" value={newTitle} name="Title"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                author: <input type="text" value={newAuthor} name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                url: <input type="link" value={newUrl} name="URL"
                    onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default BlogForm