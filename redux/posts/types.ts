import {FETCH_POSTS, FETCH_POSTS_START, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR} from './actions'
interface IFetchPosts{
    type:typeof FETCH_POSTS
    payload:Array<any>,
    SortType?:string,
    num?:number
}
interface IFetchPostsState{
    type:typeof FETCH_POSTS_START|typeof FETCH_POSTS_SUCCESS|typeof FETCH_POSTS_ERROR
    loading:boolean
    error?:boolean
}
interface InitialState{
    loading:boolean
    error?:boolean
}

interface InitialFetchState{
    data:Array<any>
}

interface IPostData{
    title:string
    body:string
    date:Date
}


export type IPostsState = IFetchPostsState 
export type IPostsFetch = IFetchPosts
export type State = InitialState
export type FetchState = InitialFetchState
export type PostData = IPostData