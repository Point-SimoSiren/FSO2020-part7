import React from 'react'
//import { useDispatch } from 'react-redux'

const User = ({ user }) => {

    // const dispatch = useDispatch()

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
            {user.username}
            {user.name}

        </div>
    )
}
export default User
