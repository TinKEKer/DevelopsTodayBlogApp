import {combineReducers} from 'redux'
import { FetchReducer, StateReducer } from './reducers'


export const rootPostReducer = combineReducers({
    fetchPost:FetchReducer,
    statePost:StateReducer
})
