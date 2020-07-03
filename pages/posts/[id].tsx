import React,{useEffect,useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { FetchPostAsync } from '../../redux/post/actionsCreator';
import {connect} from 'react-redux'
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import AddCommentIcon from '@material-ui/icons/AddComment';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BackspaceIcon from '@material-ui/icons/Backspace';
import {useRouter} from 'next/router'
import { CommentComponent } from '../../components/CommentComponent/CommentComponnent';
import { normalizeTitle } from '../../functions/normalizeTitle';
import {useSnackbar} from 'notistack'
import CommentForm from '../../components/CommentForm/CommentForm';
import { propsPost, statePost } from '../../functions/postPropsSelector';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      borderRadius:7,
      marginTop:theme.spacing(2)
    },
    title:{
       textAlign:"center",
       fontSize:25
    },
    backIcon: {
      marginLeft: 'auto'
    },
    avatar: {
       marginTop:-10,
      backgroundColor: red[800],
      width:50,
      height:50
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: '0',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    date:{
        flexGrow:1
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);


interface comments{
  body:string,
  id:number,
  postId:number
}
interface Post{
  body:string,
  comments:Array<comments>,
  id:number,
  title:string
}
interface state{
  loading:boolean,
  error:boolean
}


type Props = {
  getAsyncPost:Function
  id:string,
  post:Post,
  state:state
}

const Post = ({getAsyncPost,id,post:{body,comments,title},state:{loading}})=> {
    const router = useRouter()

    const { enqueueSnackbar} = useSnackbar();
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [comment, setComment] = useState(false);

  const handleCommentClick = () => {
    setComment(!comment);
  };

  const handleSubmit = ()=>{
    enqueueSnackbar('Comment Added',{variant:'success'})
    setComment(false)
    setExpanded(true)
  }

  const getBack = ()=>{
    router.back()
  }

  useEffect(()=>{
    getAsyncPost(+id)

  },[])

  return (
    !loading?
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={
        <Typography variant="body2"  component="h3" className={classes.title}>
                   {normalizeTitle(title)}
      </Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon style={{fontSize:30}} />
          </IconButton>
        <IconButton aria-label="Add Comment" className={classes.expand}
          onClick={handleCommentClick}
          aria-expanded={expanded}
          >
          <AddCommentIcon style={{fontSize:30}}/>
        </IconButton>
        <IconButton aria-label="Get Back" className={classes.backIcon} onClick={getBack}>
          <BackspaceIcon style={{fontSize:30}} />
        </IconButton>
      </CardActions>
      <Collapse in={comment} timeout="auto" unmountOnExit>
        <CardContent>
        <CommentForm submit={handleSubmit} id={+id} />
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map(item=>{
            return <CommentComponent data={item} key={item.id} />
          })}
        </CardContent>
      </Collapse>
    </Card>
    :null
  );
}

Post.getInitialProps=({query})=>{
    return{
      id:query.id
    }
}

const mapStateToProps=state=>({
  post: propsPost(state.post),
  state: statePost(state.post)
})

const mapDispatchToProps = dispatch =>{
  return{
    getAsyncPost:(id:number)=>dispatch(FetchPostAsync(id))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Post)