import React from 'react'
import PropTypes from 'prop-types'
import '../index.css';
import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(({ notification }) => {
        return notification
    })

    const positivity = useSelector(({ positivity }) => {
        return positivity
    })


    if (notification === null) {
        return null
    }
    else if (positivity == 'positive') {
        return (
            <div className="success">
                {notification}
            </div>
        )
    }
    else if (positivity == 'negative') {
        return (
            <div className="error">
                {notification}
            </div>
        )
    }
    Notification.propTypes = {
        message: PropTypes.string,
        positivity: PropTypes.string
    }
}


export default Notification

