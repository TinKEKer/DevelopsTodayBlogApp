import React from 'react';
import App, {AppInitialProps} from 'next/app';
import {Provider} from 'react-redux'
import { store } from '../redux/store';
import {NavBarWrapper} from '../components/NavBar/NavBarWrapper'
import { SnackbarProvider} from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import NProgress from 'nprogress';
import Router from 'next/router'
import '../config/nprogress.css'

Router.events.on('routeChangeStart',()=>NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  NProgress.configure({ showSpinner: false,easing: 'ease', speed: 650 });

class MyApp extends App<AppInitialProps> {
    public render() {
        const {Component, pageProps} = this.props;

        return (
            <Provider store={store}>
               <SnackbarProvider maxSnack={2} anchorOrigin={{vertical:'bottom',horizontal:'right'}} iconVariant={{error:<DeleteIcon/>}}>
                   <NavBarWrapper>
                         <Component {...pageProps} />
                  </NavBarWrapper>
            </SnackbarProvider>
            </Provider>
        );
    }
}




export default MyApp