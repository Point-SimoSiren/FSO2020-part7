import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import positivityReducer from './reducers/positivityReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import currentUserReducer from './reducers/currentUserReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    positivity: positivityReducer,
    blogs: blogReducer,
    currentUser: currentUserReducer,
    users: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
export default store