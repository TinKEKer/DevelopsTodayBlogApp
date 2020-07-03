
interface Obj{
    [propName: string]: any;
}

export const propsPosts = (item:Obj):Obj=>item.fetchPosts.data
export const statePosts = (item:Obj):Obj=>item.statePosts