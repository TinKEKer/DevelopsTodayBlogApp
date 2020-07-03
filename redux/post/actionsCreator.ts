import { FETCH_POST, FETCH_POST_START, FETCH_POST_SUCCESS, FETCH_POST_ERROR, ADD_COMMENT } from "./actions"
import { FETCHPOST, POSTSTATE } from "./types"
import axios from '../../config/Axios'


export const FetchPost = (data):FETCHPOST=>{
    return{
        type:FETCH_POST,
        payload:data
    }
}

export const FetchPostStart = ():POSTSTATE=>{
    return{
        type:FETCH_POST_START,
        loading:true
    }
}

export const FetchPostSuccess = ():POSTSTATE=>{
    return{
        type:FETCH_POST_SUCCESS,
        loading:false,
        error:false
    }
}

export const FetchPostError = ():POSTSTATE=>{
    return{
        type:FETCH_POST_ERROR,
        loading:false,
        error:true
    }
}
export const AddComment=()=>{
    return{
        type:ADD_COMMENT
    }
}

export const AsyncAddComment = (data)=>{
    return async dispatch=>{
        await axios.post('/comments',data)
        dispatch(AddComment())
        dispatch(FetchPostAsync(data.postId))
    }
}

export const FetchPostAsync = (id:number) =>{
    return dispatch=>{
        dispatch(FetchPostStart())
        axios.get(`posts/${id}?_embed=comments`)
        .then(data=>{
            console.log(data)
            console.log(id)
            dispatch(FetchPost(data.data))
            dispatch(FetchPostSuccess())
        })
        .catch(error=>{
            dispatch(FetchPostError())
            console.error(Error,error)
        })
    }
}