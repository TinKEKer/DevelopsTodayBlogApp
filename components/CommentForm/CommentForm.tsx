import React,{useState,ChangeEvent} from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {connect } from 'react-redux'
import {  AsyncAddComment } from '../../redux/post/actionsCreator';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 10,
    maxWidth:'100%'
  },
  input: {
    flexGrow:9
  },
  button: {
    flexGrow: 1,
  },
}),
);

type Props = {
    AsyncAddComment:Function,
    submit:Function,
    id:number
}

interface commentData{
    postId:number,
    body:string
}

const CommentForm:React.FC<Props> =({AsyncAddComment,submit,id})=> {

    const classes = useStyles();
     

    const [input,ChangeInput] = useState({
        body:'',
        changed:false
    })

    const handleChange = ({target:{value}}:ChangeEvent<HTMLInputElement>)=>{
        ChangeInput({
            body:value,
            changed:true
        })
    }

    const AddComment = (data:commentData)=>{
         AsyncAddComment(data)
    }

     const handleSubmit = ()=>{
         const {body} = input
         const commentData:commentData={
             postId:id,
             body:body
         }
         AddComment(commentData)
         submit()
     }

    let error = false;
    const {changed,body}=input
     error = changed===true&&body.trim()===''?error=true:error=false
    return (
        <form>
            <Grid container className={classes.root}>
                <TextField
                label="Your Comment"
                value={body}
                multiline
                onChange={handleChange}
                error={error}
                className={classes.input}
                />
                <Button variant="outlined" disabled={changed===false?true:error} className={classes.button} onClick={handleSubmit}>Add</Button>
            </Grid>
        </form>
    )
}


const mapDispatchToProps = dispatch=>{
    return{
        AsyncAddComment:(data:commentData)=>dispatch(AsyncAddComment(data))
    }
}

export default connect(null,mapDispatchToProps)(CommentForm)
