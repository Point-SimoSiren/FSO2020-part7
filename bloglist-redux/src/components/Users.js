import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {

    const users = useSelector(({ users }) => {
        return users
    })
    console.log(users)
    return (
        <div>
            <h2>Users</h2>
            {
                users.map(u =>
                    <User key={u.id} user={u} />
                )
            }
        </div>
    )
}
export default Users