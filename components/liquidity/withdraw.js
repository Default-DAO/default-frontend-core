import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'
import keys from '../../config/keys'

const WithdrawLiquidity = props => {
  const { classes, open, close } = props

  const [value, setValue] = useState('')
  const [selectedToken, setSelectedToken] = useState('usdc')

  return (
    <Modal width={400} className={classes.modal} open={open} close={close}>
      <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >Withdraw Liquidity</Text>
      <TokenForm
        currencies={['usdc', 'dnt']}
        value={value}
        onValueChange={(value) => setValue(value)}
        selectedToken={selectedToken}
        onSelectedTokenChange={(token) => setSelectedToken(token)}
      />
      <Text className={classes.feeText} margin='14px 0px 0px 0px' center type="paragraph" fontSize={13} fontWeight={400} >
        Withdraw fee: 0.03%
          </Text>
      <Button
        onClick={() => { }}
        margin="35px 0px 0px 0px" gradient width={200} height={50}>
        Withdraw!
            </Button>
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  },
  feeText: {
    opacity: 0.8
  }
});

export default withStyles(useStyles)(WithdrawLiquidity);