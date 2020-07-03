import React, { ReactNode,ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SortPosts } from '../../redux/posts/actionsCreator';
import {connect} from 'react-redux'


const useStyles = makeStyles({
    root: {
      flexGrow: 2,
      marginTop:20,
    },
    tab:{
      flexGrow:1
    }
  });
  
type Props={
  children:ReactNode,
  sortPosts:Function
}

 const TabWrapper:React.FC<Props>=({children,sortPosts})=>{
    const classes = useStyles();
    const [value, setValue] = React.useState('desc');
  
    const Sort = (type:string)=>{
     sortPosts(type)
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement> , newValue: string) => {
      setValue(newValue);
      Sort(newValue)
    };
    return (
        <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Latest" value="desc" className={classes.tab} />
          <Tab label="Oldest" value="asc" className={classes.tab} />
        </Tabs>
      </Paper>
      {children}
      </>
    );
  }

  const mapDispatchToProps = (dispatch:any)=>{
    return{
      sortPosts:(type:string)=>dispatch(SortPosts(type))
    }
  }

  export default connect(null,mapDispatchToProps)(TabWrapper)