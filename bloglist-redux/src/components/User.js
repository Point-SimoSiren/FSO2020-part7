import React from 'react'

const User = ({ user }) => {

    const userStyle = {
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
    if (!user) {
        return (null)
    }
    return (
        <div style={userStyle}>
            <h3>{user.username}</h3>
            <p>Name: {user.name}</p>
            <p>Blogs: {user.blogs.length}</p>

        </div>
    )
}
export default User
