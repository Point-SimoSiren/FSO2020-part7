import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {

    const blogs = useSelector(({ blogs }) => {
        return blogs.filter(b => b.user.id.includes(user.id)
        )
    })


    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>

            {blogs.map(ub => (
                <div key={ub.id}>
                    <h4>{ub.title}{' '} Likes: {ub.likes} </h4>

                </div>
            ))}

        </div>
    )
}
export default User
