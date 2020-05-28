import React from 'react'
import PropTypes from 'prop-types'
import '../index.css';
import { useSelector } from 'react-redux'
//import Alert from '@material-ui/lab/Alert';
import { Alert } from '@material-ui/lab';

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
    else if (positivity === 'positive') {
        return (
            <Alert variant="outlined" severity="success">
                {notification}
            </Alert>
        )
    }
    else if (positivity === 'negative') {
        return (
            <Alert variant="outlined" severity="error">
                {notification}
            </Alert>
        )
    }
    Notification.propTypes = {
        message: PropTypes.string,
        positivity: PropTypes.string
    }
}

export default Notification

