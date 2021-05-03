import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Toast from '../../reusable/toast'
import Header from './header'
import UserSearch from '../modals/user-search'
import AddLiquidity from '../liquidity/add'
import SwapLiquidity from '../liquidity/swap'
import WithdrawLiquidity from '../liquidity/withdraw'
import { useStoreApi } from '../../redux/provider'

const Layout = (props) => {
  const store = useStoreApi()
  useEffect(() => {
    
  }, [])

  const { classes, Component, route } = props;
  return (
    <div className={classes.root}>
      <Toast />
      <CssBaseline />
      <Header/>
      <div className={classes.main}>
        {Component()}
      </div>
      <UserSearch
        open={store.showAddStakeNetwork}
        close={() => store.setShowAddStakeNetwork(false)}
        title={'Add to stake network'}
        action={(selected) => {

        }}
      />
      <UserSearch
        open={store.showAddValueNetwork}
        close={() => store.setShowAddValueNetwork(false)}
        title={'Add to value network'}
        action={(selected) => {

        }}
      />
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