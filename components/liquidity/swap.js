import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { mdiArrowDown } from '@mdi/js';
import Icon from '@mdi/react'

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'
import keys from '../../config/keys'

const SwapLiquidity = props => {
  const { classes, open, close } = props

  const [from, setFrom] = useState('usdc')
  const [to, setTo] = useState('dnt')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  function switchTokens(from, to) {
    setFrom(from)
    setTo(to)
    setFromValue('')
    setToValue('')
  }

  function handleSwitch(token, direction) {
    if (direction == 'from') {
      if (token == 'usdc') {
        switchTokens('usdc', 'dnt')
      } else {
        switchTokens('dnt', 'usdc')
      }
    } else {
      if (token == 'usdc') {
        switchTokens('dnt', 'usdc')
      } else {
        switchTokens('usdc', 'dnt')
      }
    }
  }

  return (
    <Modal width={400} className={classes.modal} open={open} close={close}>
      <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >Swap Liquidity</Text>
      <TokenForm
        currencies={['dnt', 'usdc']}
        value={fromValue}
        onValueChange={(value) => setFromValue(value)}
        selectedToken={from}
        onSelectedTokenChange={(token) => handleSwitch(token, 'from')}
        label="From"
      />
      <Icon path={mdiArrowDown}
        size={0.7}
        color={keys.WHITE}
        className={classes.icon}
      />
      <TokenForm
        currencies={['dnt', 'usdc']}
        value={toValue}
        onValueChange={(value) => setToValue(value)}
        selectedToken={to}
        onSelectedTokenChange={(token) => handleSwitch(token, 'to')}
        label="To"
      />
      <Button
        onClick={() => { }}
        margin="35px 0px 0px 0px" gradient width={200} height={50}>
        Swap!
            </Button>
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  },
  icon: {
    margin: '10px 0px',
    color: keys.PRIMARY_COLOR
  }
});

export default withStyles(useStyles)(SwapLiquidity);