import {IPostsState,IPostsFetch,State, FetchState} from './types'
import { FETCH_POSTS, FETCH_POSTS_START, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS, FETCH_POSTS_ASYNC, DELETE_POST, ADD_POST, SORT_POSTS } from './actions'
import { FilterFunc } from '../../functions/deleteItem'
import { SortPosts } from '../../functions/sortPosts'

const InitialState:State={
    loading:true,
    error:false
}

const InitialFetchState:FetchState={
    data:[]
}

export const FetchReducer = (state=InitialFetchState,action:IPostsFetch):FetchState=>{
    const {type,payload,SortType,num} = action
    switch(type){
        case FETCH_POSTS:
            return {...state,data:SortPosts(payload)}
        case FETCH_POSTS_ASYNC:
            return {...state}
        case DELETE_POST:
           const sup = FilterFunc(state.data,num)
            return {...state,data:sup}
        case ADD_POST:
            return {...state}
        case SORT_POSTS:
            return{...state,data:SortPosts(state.data,SortType)}
        default:
            return state
    }
}
export const StateReducer = (state=InitialState,action:IPostsState):State=>{
    const {type,loading,error} = action
    switch(type){
        case FETCH_POSTS_START:
            return {...state,loading}
        case FETCH_POSTS_SUCCESS:
            return{...state,error,loading:false}
        case FETCH_POSTS_ERROR:
            return{...state,loading,error}
        default:
            return state
    }
}