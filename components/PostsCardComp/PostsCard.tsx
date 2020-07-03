import React,{useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Collapse from '@material-ui/core/Collapse';
import { Tooltip } from '@material-ui/core';
import CommentForm from '../CommentForm/CommentForm'
import {useSnackbar} from 'notistack'
import { getNormalDate } from '../../functions/getNormalDate';
import { normalizeTitle } from '../../functions/normalizeTitle';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      borderRadius:7,
      marginTop:theme.spacing(2),
      '&:hover': {
        boxShadow: '0px 2px 20px -6px'
      },
    },
    delete: {
      marginLeft: 'auto'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    tooltip:{
        fontSize:15
    }
  }),
);

interface PostObj{
  body:string,
  date:Date,
  id:number,
  title:string
}
type Props={
  color:{},
  data:PostObj,
  delete:Function
}
 export const PostsCard:React.FC<Props> = ({color,data:{body,date,id,title},delete:deletePost})=> {
  const classes = useStyles();
  const { enqueueSnackbar} = useSnackbar();

  const [expanded, setExpanded] = useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const deleteHandler = ()=>{
    deletePost(id)
    enqueueSnackbar("Post Deleted",{variant:'error'})
  }

 const handleSubmit = ()=>{
     enqueueSnackbar('Comment Added',{variant:'success'})
     setExpanded(false)
 }
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar  style={{backgroundColor:color[800]}}>
            A
          </Avatar>
        }
        title={normalizeTitle(title)}
        subheader={getNormalDate(new Date(date))}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link href={`/posts/${id}`}>
      <Button variant="outlined">Read More</Button>
      </Link>
      <Tooltip title="Add Comment" classes={{tooltip:classes.tooltip}}>
        <IconButton aria-label="add comment"  onClick={handleExpandClick}  aria-expanded={expanded} >
          <AddCommentIcon style={{fontSize:30}}/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Delete Post" classes={{tooltip:classes.tooltip}}>
        <IconButton aria-label="delete post" className={classes.delete} onClick={deleteHandler}>
          <DeleteIcon style={{fontSize:30}} />
        </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentForm id={id} submit={handleSubmit}/>
        </CardContent>
      </Collapse>
    </Card>
  );
}



