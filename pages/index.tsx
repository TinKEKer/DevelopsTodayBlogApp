import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import { FetchPostsAsync, DeletePost, AsyncDeletePost } from '../redux/posts/actionsCreator';
import {PostsCard} from '../components/PostsCardComp/PostsCard'
import TabWrapper from '../components/TabBar/TabWrapper'
import { getRNDColor } from '../functions/getRNDcolor';
import { statePosts, propsPosts } from '../functions/postsPropsSelector';

interface PostObj{
  body:string,
  date:Date,
  id:number,
  title:string
}

interface state{
  [propName: string]: boolean;
}


type Props={
  data:Array<PostObj>
  deletePost:Function
  getAsyncPosts:Function
  state:state
}

 const Posts:React.FC<Props> = ({data,getAsyncPosts,deletePost,state:{loading}})=> {
  useEffect(()=>{
    getAsyncPosts()
  }
  ,[])
  return (
     <>
    <TabWrapper>
    {data!==[]&&!loading?data.map(item=><PostsCard data={item} key={item.id} delete={deletePost} color={getRNDColor()}/>
    )
    :null}
    </TabWrapper>
    </>
  );
}

const mapStateToProps = state =>({
  data: propsPosts(state.posts),
  state: statePosts(state.posts)
})

const mapDispatchToProps = dispatch=>{
  return {
    getAsyncPosts:()=>dispatch(FetchPostsAsync()),
    deletePost:(id:number)=>dispatch(AsyncDeletePost(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts)