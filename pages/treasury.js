import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { mdiShareVariantOutline } from '@mdi/js';

import keys from '../config/keys'
import Button from '../reusable/button'
import Text from '../reusable/text'
import Card from '../reusable/card'
import Table from '../reusable/table'
import AddLiquidity from '../components/liquidity/add'
import StakeModal from '../components/liquidity/stake'
import { useStoreApi } from '../store/provider'
import { format, round } from '../utils/money'

const transactionTypes = {
  STAKE: 'STAKE',
  PEER_REWARD: 'PEER_REWARD',
  MINING_REWARD: 'MINING_REWARD',
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP"
}

const Treasury = props => {
  const store = useStoreApi()
  // controls show and hide of modals
  const { showAddLiquidity, setShowAddLiquidity, showStakeLiquidity, setShowStakeLiquidity } = store
  const { classes } = props

  return (
    <div className={classes.treasury}>    
      {/* show a modal to add liquidity   */}
      <AddLiquidity
        open={showAddLiquidity}
        close={() => setShowAddLiquidity(false)}
        callback={() => {
          
        }}
      />
      {/* shows a modal to stake liquidity */}
      <StakeModal
        open={showStakeLiquidity}
        close={() => setShowStakeLiquidity(false)}
        title="Stake Your DNT"
        label="Stake DNT"
        buttonLabel="Stake"
        callback={() => {
          
        }}
      />
    </div>
  )
}

const useStyles = theme => ({
  
});

export default withStyles(useStyles)(Treasury);