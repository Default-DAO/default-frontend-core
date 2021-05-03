// require('./global-style.css')
import './global-style.css'
import React from 'react';
import Head from 'next/head';
import { StoreProvider } from '../store/provider'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as keys from '../config/keys';
import Layout from '../components/main/layout'

// Create a theme instance for material ui
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: keys.WHITE,
        },
        error: {
            main: keys.PRIMARY_COLOR,
        },
        background: {
            default: keys.BACKGROUND_COLOR,
        }
    },
    typography: {
        htmlFontSize: 15,
    },
     shadows: ["none"]
});


const noAuth = [    
    // '/',
    '/register',
    '/settings/terms-of-service',
    '/settings/privacy-policy'
]

const Default = (props) => {
    const { Component, pageProps, router } = props;
    
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    
    return (
        // React.Fragment lets you add extra children without adding a node to the DOM
        <React.Fragment>
            <Head>
                <title>{keys.APP_NAME}</title>  
            </Head>
            {/* Wrapping the app with Redux Provider lets components further down the tree access the Redux */}                    
            <StoreProvider>
                <MuiThemeProvider theme={theme}>
                    {(noAuth.includes(router.route)) ? (
                        <Component {...pageProps} />
                    ) : (
                        //topbar and navigation rendered on every page inside the app except for the landing page
                        <Layout 
                            route={router.route}
                            Component={() => { return (<Component {...pageProps}/>) }}
                        />
                    )}
                </MuiThemeProvider>
            </StoreProvider>           
        </React.Fragment>            
    );
}

export default Default;