import React from 'react'
import { useSelector } from 'react-redux'
import {
    Link
} from "react-router-dom"

const Users = () => {

    const users = useSelector(({ users }) => {
        return users
    })

    return (
        <>
            <h2>Users</h2>
            <table>
                <tr>
                    <td></td>
                    <td>Blogs created</td>
                </tr>
                {
                    users.map(user =>
                        <tr key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </Link>
                        </tr>
                    )
                }
            </table>
        </>
    )
}
export default Users