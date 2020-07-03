interface Obj{
    [propName: string]: any;
}

export const propsPost=(item:Obj):Obj=>item.fetchPost.data

export const statePost = (item:Obj):Obj=>item.statePost