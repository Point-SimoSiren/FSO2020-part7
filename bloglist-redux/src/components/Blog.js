import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeAction } from '../reducers/blogReducer'

const Blog = ({ blog, handleDeleteClick }) => {
    const [showBlog, setShowBlog] = useState(false)

    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (showBlog === false) {
        return (


            <div key={blog.id} style={blogStyle}>
                <h3 onClick={() => setShowBlog(true)}> {blog.title}</h3>
            </div>)
    }
    else {
        return (
            <div key={blog.id} style={blogStyle}>

                <h3 onClick={() => setShowBlog(false)}> {blog.title} </h3>
                <h4>Author: {blog.author}</h4>
                <h4>Url: {blog.url} </h4>
                <p>Added by: {blog.user}</p>
                <h4>Likes: {blog.likes} <button onClick={() => dispatch(likeAction(blog.id))}>Like!</button></h4>
                <button style={{ height: '30px', width: '70px' }}
                    onClick={() => handleDeleteClick(blog.id)}>Delete</button>

            </div >
        )
    }
}
export default Blog
