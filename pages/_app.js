import './global-style.css'
import React, { useState } from 'react';
import Head from 'next/head';
import { StoreProvider } from '../store/provider'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { builder, BuilderComponent } from '@builder.io/react'

import * as keys from '../config/keys';
import Layout from '../components/main/layout'
import { useStoreApi } from '../store/provider'
import { isMetamask, getEthAddress, handleAccountChange, handleChainChange } from '../api/web3'
import * as api from '../api/get'
import Toast from '../reusable/toast'
import Loading from '../components/loading'

builder.init(process.env.BUILDERIO_API_KEY)

// Create a theme instance for material ui
export const theme = createMuiTheme({
  palette: {
    background: {
      default: keys.BACKGROUND_COLOR
    },
    primary: {
      main: keys.PRIMARY_COLOR
    }
  },
  typography: {
    htmlFontSize: 15,
  },
  shadows: ["none"]
});

const noAuth = [
  "/register",
  "/overview/landing",
  "/overview/treasury",
  "/overview/mining",
  "/overview/voting",
  "/overview/review"
]

const App = (props) => {
  const { children, router } = props
  const store = useStoreApi()
  let { reset, isLoading, setIsLoading, setMember, getProtocol, getMember, showRegistration, setShowRegistration } = store
  const [landingPage, setLandingPage] = useState({})
  React.useEffect(() => {
    if (!isMetamask()) {
      reset()
      setShowRegistration(true)
      setIsLoading(false)
    }

    handleChainChange(async (chainId) => {
      reset()
      await loadInfo()
    })

    handleAccountChange(async (account) => {
      reset()
      await loadInfo()
    })


    loadInfo()
  }, []);

  async function loadLandingPage() {
    const landingPage = await builder.get('page', { url: '/' }).promise();
    setLandingPage(landingPage)
  }

  async function loadInfo() {
    setIsLoading(true)

    let ethAddress = await getEthAddress()
    if (!ethAddress) {
      await loadLandingPage()
      setMember({})
      setShowRegistration(true)
      setIsLoading(false)
      return
    }
    let member = await api.getMember({
      params: {
        ethAddress
      },
      store
    })
    if (!member || !member.claimed) {
      await loadLandingPage()
      setShowRegistration(true)
      setIsLoading(false)
      return
    }
    await api.getProtocol({
      params: {},
      store
    })

    setShowRegistration(false)
    setIsLoading(false)
  }

  function renderApp() {


    if (showRegistration) {
      return <BuilderComponent
        content={landingPage}
        model="page"
      />
    }

    if (isLoading) {
      return <Loading />
    }

    return <Layout
      route={router.route}
      Component={() => {
        return children
      }}
    />
  }

  return <React.Fragment>
    <Toast />
    {
      (noAuth.includes(router.route)) ? 
      children : 
      renderApp()
    }
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