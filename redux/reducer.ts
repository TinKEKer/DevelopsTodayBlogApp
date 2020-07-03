import {combineReducers} from 'redux'
import {rootPostReducer} from './post/rootReducer'
import {rootPostsReducer} from './posts/rootReducer'


export const rootReducer = combineReducers({
    post:rootPostReducer,
    posts:rootPostsReducer
})

