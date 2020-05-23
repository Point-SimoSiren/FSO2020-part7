import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Blogs from './Blogs'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Blogs />
    </Provider>,
    document.getElementById('root'))