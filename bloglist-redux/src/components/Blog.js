import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeAction } from '../reducers/blogReducer'
import { positiveAction } from '../reducers/positivityReducer'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'

const Blog = ({ blog, handleDeleteClick }) => {
    const [showBlog, setShowBlog] = useState(false)

    const dispatch = useDispatch()

    const handleLikeClick = () => {
        dispatch(likeAction(blog))
        dispatch(positiveAction)
        dispatch(notificationAction(`You liked blog: ${blog.title}!`))
        setTimeout(() => {
            dispatch(emptyAction())
        }, 5000)
    }

    const blogStyle = {
        textAlign: 'center',
        marginRight: 300,
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderColor: 'orange',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 5
    }

    if (showBlog === false) {
        return (


            <div key={blog.id} style={blogStyle} onClick={() => setShowBlog(true)}>
                <h3>{blog.title}</h3>
            </div>)
    }
    else {
        return (
            <div key={blog.id} style={blogStyle} onClick={() => setShowBlog(!showBlog)}>

                <h3 > {blog.title} </h3>
                <h4>Author: {blog.author}</h4>
                <h4>Url: {blog.url} </h4>
                <p>Added by: {blog.user.username}</p>
                <h4>Likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>Like!</button></h4>
                <button style={{ height: '30px', width: '70px' }}
                    onClick={() => handleDeleteClick(blog.id)}>Delete</button>

            </div >
        )
    }
}
export default Blog
