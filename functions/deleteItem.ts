import _ from 'lodash'

interface PostsData{
    title:string
    body:string
    date?:Date
    id:number
}

export const FilterFunc = (data:Array<PostsData>,num:number)=>_.filter(data,item=>item.id!==num)