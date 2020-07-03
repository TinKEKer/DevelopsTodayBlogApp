import { FETCHPOST,POSTSTATE,STATEPOST,POSTFETCH } from './types'
import { FETCH_POST, FETCH_POST_START, FETCH_POST_SUCCESS, FETCH_POST_ERROR, ADD_COMMENT } from "./actions"

const PostState:STATEPOST={
    loading:true,
    error:false
}

const FetchPostState:POSTFETCH={
    data:[]
}

export const FetchReducer = (state=FetchPostState,action:FETCHPOST):POSTFETCH=>{
    const {type,payload} = action
    switch(type){
        case FETCH_POST:
            return{
                ...state,data:payload
            }
        case ADD_COMMENT:
            return{...state}
        default:
            return state
    }

}

export const StateReducer = (state=PostState,action:POSTSTATE):STATEPOST=>{
    const {loading,error,type} = action
    switch(type){
        case FETCH_POST_START:
            return{
                ...state,loading
            }
        case FETCH_POST_SUCCESS:
            return{
                ...state,loading,error
            }
        case FETCH_POST_ERROR:
            return{
                ...state,loading,error
            }
            default:
                return state
    }
}