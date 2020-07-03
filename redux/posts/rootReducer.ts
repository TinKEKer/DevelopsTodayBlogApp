import {combineReducers} from 'redux'
import { FetchReducer, StateReducer } from './reducers'


export const rootPostsReducer = combineReducers({
    fetchPosts:FetchReducer,
    statePosts:StateReducer
})
