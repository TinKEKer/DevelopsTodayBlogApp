import {FETCH_POSTS, FETCH_POSTS_START, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS,  DELETE_POST, ADD_POST, SORT_POSTS} from './actions'
import {IPostsState,IPostsFetch, PostData} from './types'
import axios from '../../config/Axios'

export const FetchPosts = (data:Array<any>):IPostsFetch=>{
    return{
        type:FETCH_POSTS,
        payload:data
    }
}

export const FetchPostsStart = ():IPostsState=>{
    return{
        type:FETCH_POSTS_START,
        loading:true
    }
}

export const FetchPostsCompleted = ():IPostsState=>{
    return{
        type:FETCH_POSTS_SUCCESS,
        loading:false,
        error:false
    }
}

export const FetchPostsError = ():IPostsState=>{
    return{
        type:FETCH_POSTS_ERROR,
        loading:false,
        error:true
    }
}

export const DeletePost = (id:number)=>{
    return{
        type:DELETE_POST,
        num:id
    }
}

export const AsyncDeletePost = (id:number)=>{
    return async dispatch=>{
        await axios.delete(`posts/${id}`)
        dispatch(DeletePost(id))
    }
}


export const AddPost = ()=>{
   return{
       type:ADD_POST
   }
}

export const AsyncAddPost = (postData)=>{
    return async dispatch=>{
        await axios.post('posts',postData)
        dispatch(AddPost())
        dispatch(FetchPostsAsync())
    }
}

export const SortPosts = (type)=>{
    return{
      type:SORT_POSTS,
      SortType:type
    }
}



export const FetchPostsAsync = ()=>{
    return async dispatch=>{
        dispatch(FetchPostsStart())
         axios.get('posts')
        .then(data=>{
            dispatch(FetchPosts(data.data))
            dispatch(FetchPostsCompleted())
        })
        .catch(error=>{
            dispatch(FetchPostsError())
            console.error(error)
        }
        )
    }
}