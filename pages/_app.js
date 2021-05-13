// require('./global-style.css')
import './global-style.css'
import React, {useState} from 'react';
import Head from 'next/head';
import { StoreProvider } from '../store/provider'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as keys from '../config/keys';
import Layout from '../components/main/layout'
import { useStoreApi } from '../store/provider'
import Register from '../components/register'
import { isMetamask, getEthAddress, handleAccountChange, handleChainChange } from '../api/web3'
import { getMember, getMemberPool, getProtocol } from '../api/get'
import Toast from '../reusable/toast'
import Loading from '../components/loading'

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
  '/register',
  '/settings/terms-of-service',
  '/settings/privacy-policy'
]

async function checkRegistered(store) {
  try {
    let ethAddress = await getEthAddress()
    if (!ethAddress) {
      return {}
    }    
    let member = await getMember({params: {
      ethAddress
    }})
    
    return member
  } catch(err) {
    store.setMember({})
    store.setIsLoading(false)
  }
}

const App = (props) => {
  const { children, router } = props
  const store = useStoreApi()
  let { reset, isLoading, setIsLoading, setMember, getMember } = store
  React.useEffect(() => {
    if (!isMetamask()) {
      return reset()
    }

    handleChainChange((chainId) => {
      reset()
      window.location.reload();
    })

    handleAccountChange(async (account) => {
      reset()
      await loadInfo()
    })

    loadInfo()
  }, []);

  async function loadInfo() {
    setIsLoading(true)
    let member = await checkRegistered(store)
    if (!member || !member.ethAddress) {
      setMember({})
      setIsLoading(false)
      return
    }
    setMember(member)

    await getMemberPool({
      params: {
        ethAddress: store.getMember().ethAddress
      },
      store
    })
    await getProtocol({
      params: {},
      store
    })

    setIsLoading(false)
  }

  if (noAuth.includes(router.route)) {
    return children
  }

  if (isLoading) {
    return <Loading/>
  }
  
  return <React.Fragment>
    <Toast/>
    {(getMember() && getMember().nonce) ? <Layout
      route={router.route}
      Component={() => { 
        return children 
      }}
    /> : <Register />}
  </React.Fragment>
}

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
          <App router={router}>
            <Component {...pageProps} />
          </App>
        </MuiThemeProvider>
      </StoreProvider>
    </React.Fragment>
  );
}

export default Default;