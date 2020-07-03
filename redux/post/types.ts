import { FETCH_POST, FETCH_POST_ERROR, FETCH_POST_START, FETCH_POST_SUCCESS } from "./actions";

interface IFETCHPOST{
    type:typeof FETCH_POST,
    payload:Array<any>
}

interface IPOSTSTATE{
    type:typeof FETCH_POST_ERROR|typeof FETCH_POST_START|typeof FETCH_POST_SUCCESS
    loading:boolean
    error?:boolean
}

interface PostState{
    loading:boolean
    error?:boolean
}

interface FetchPost{
    data:Array<Object>
}

export type STATEPOST = PostState
export type POSTFETCH = FetchPost
export type FETCHPOST = IFETCHPOST
export type POSTSTATE = IPOSTSTATE