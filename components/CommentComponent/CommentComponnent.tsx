import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      borderRadius:7,
      marginTop:theme.spacing(2)
    },
    delete: {
      marginLeft: 'auto'
    },
    avatar: {
      backgroundColor: red[800],
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

interface COMMENTOBJ{
  body:string
  id:number
  postId:number
}

type Props={
  data:COMMENTOBJ
}

 export const CommentComponent:React.FC<Props> = (props)=> {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            A
          </Avatar>
        }
        title='Comment'
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.data.body}
        </Typography>
      </CardContent>
    </Card>
  );
}