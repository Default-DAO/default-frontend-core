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
import { getEthAddress, handleAccountChange, handleChainChange } from '../api/web3'
import { getMember } from '../api/get'
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

async function checkRegistered(callback) {
  try {
    let member = localStorage.getItem(keys.MEMBER)
    if (member) member = JSON.parse(member)

    if (member && member.ethAddress) {
      return callback(member)
    }

    let ethAddress = await getEthAddress()
    if (!ethAddress) return
    member = await getMember({params: {
      ethAddress
    }})
    localStorage.setItem(keys.MEMBER, JSON.stringify(member))
    callback(member.apiMember)
  } catch(err) {
    console.log(err)
    localStorage.setItem(keys.MEMBER, JSON.stringify({}))
    callback({})
  }
}

const App = (props) => {
  const { children, router } = props
  const { setEthAddress, setEthBalance, setChainId, setMember, member } = useStoreApi()
  const [isLoading, setIsLoading] = useState(true)
  React.useEffect(() => {
    handleChainChange((chainId) => {
      setMember({})
      localStorage.setItem(keys.MEMBER, JSON.stringify({}))
      setEthAddress(undefined)
      setEthBalance(undefined)
      setChainId(chainId)
      window.location.reload();
      setIsLoading(false)
    })

    handleAccountChange((account) => {
      setMember({})
      localStorage.setItem(keys.MEMBER, JSON.stringify({}))
      setEthAddress(undefined)
      setEthBalance(undefined)

      checkRegistered((member) => {
        setMember(member)
        setIsLoading(false)
      })
    })

    checkRegistered((member) => {
      setMember(member)
      setIsLoading(false)
    })
  }, []);

  if (noAuth.includes(router.route)) {
    return children
  }

  if (isLoading) {
    return <Loading/>
  }
  
  return <React.Fragment>
    <Toast/>
    {(member && member.nonce) ? <Layout
      route={router.route}
      Component={() => { return children }}
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