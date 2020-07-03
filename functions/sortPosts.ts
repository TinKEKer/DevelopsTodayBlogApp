import _ from 'lodash/'

interface PostsData{
    title:string
    body:string
    date?:Date
    id:number
}

export const SortPosts = (data:Array<PostsData>,type='desc'):Array<PostsData>=>{
    return _.orderBy(data,'id',type)
}