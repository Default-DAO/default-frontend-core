import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './header'
import AddLiquidity from '../liquidity/add'
import SwapLiquidity from '../liquidity/swap'
import WithdrawLiquidity from '../liquidity/withdraw'
import { useStoreApi } from '../../store/provider'
import { getMemberPool, getProtocol } from '../../api/get'
const Layout = (props) => {
  const store = useStoreApi()

  const { classes, Component, route } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div className={classes.main}>
        {Component()}
      </div>
      <AddLiquidity
        open={store.showAddLiquidity}
        close={() => store.setShowAddLiquidity(false)}
      />
      <SwapLiquidity
        open={store.showSwapLiquidity}
        close={() => store.setShowSwapLiquidity(false)}
      />
      <WithdrawLiquidity
        open={store.showWithdrawLiquidity}
        close={() => store.setShowWithdrawLiquidity(false)}
      />
    </div>
  );
}

const useStyles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden'
  },
  main: {
    flex: 1
  }
})

export default withStyles(useStyles)(Layout);