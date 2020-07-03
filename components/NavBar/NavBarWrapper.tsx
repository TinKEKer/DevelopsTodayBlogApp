import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth:'100%'
    },
    button: {
      marginLeft:theme.spacing(1)
    },
    title: {
      flexGrow: 1,
    },
  }),
);

type Props={
  children:ReactNode
}

export const NavBarWrapper:React.FC<Props>=({children})=> {
  const {root,title,button} = useStyles();
  
  return (
    <div className={root}>
      <AppBar position="static">
        <Toolbar>
            <Link href="/">
          <Typography variant="h6" className={title}>
            DevelopsToday Blog
          </Typography>
          </Link>
          <Link href="/posts/new">
          <Button color="inherit" className={button}>Create Post</Button>
          </Link>
          <Link href="/">
          <Button color="inherit" className={button}>Posts</Button>
          </Link>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}