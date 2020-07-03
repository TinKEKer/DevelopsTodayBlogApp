
import {Paper,Grid,TextField, Button, FormControl} from '@material-ui/core'
import React, { Component, ChangeEvent } from 'react'
import { PostData } from '../../redux/posts/types';
import { AsyncAddPost } from '../../redux/posts/actionsCreator';
import {connect} from 'react-redux'
import Router from 'next/router'
import { withSnackbar } from 'notistack';


type AddPostProps = {
    addPost:Function,
    enqueueSnackbar:Function
}

 class AddPost extends Component<AddPostProps> {
    state={
        title:'',
        body:'',
        changed:false
    }


       changeHandler = ({target:{name,value}}:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
             [name]:value,
             changed:true
        })
    }

    addPost=(data)=>this.props.addPost(data)

      handleSubmit = ()=>{
          const PostData:PostData={
              title:this.state.title,
              body:this.state.body,
              date:new Date()
          }
          this.addPost(PostData)
          Router.push('/')
          this.props.enqueueSnackbar('Post Added',{variant:'success'})
      }

    render() {
        const {title,body,changed} = this.state
        let err = false
         err =changed==true&& (title.trim()===''|| body.trim()==='')?err=true:err=false
        return (
            <Paper>
            <form>
                <Grid container>
                    <FormControl fullWidth>
                    <TextField variant="outlined" margin="normal" fullWidth  label="Title" error={err} value={title} name='title' required  onChange={this.changeHandler}/>
                    <TextField variant="outlined" margin="normal" fullWidth  label="Body" error={err} name="body" value={body} required onChange={this.changeHandler}/>
                    <Button fullWidth color="primary" variant="outlined" disabled={changed===false?true:err} onClick={this.handleSubmit}>Add Post</Button>
                    </FormControl>
                    </Grid>
            </form>
        </Paper>
        )
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        addPost:(PostData:PostData)=>dispatch(AsyncAddPost(PostData))
    }
}


export default withSnackbar(connect(null,mapDispatchToProps)(AddPost))

