import React, { useState, useEffect, useCallback } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'
import { useStoreApi } from '../../store/provider'
import { checkAddLiquidity } from '../../api/post'
import { sendTransaction, getWeb3 } from '../../api/web3'
import abi from '../../api/erc20.json'

const AddLiquidity = (props) => {
  const store = useStoreApi()
  const {getMember} = store
  const [value, setValue] = useState('')


  const { classes, open, close } = props
  return (
    <Modal width={400} className={classes.modal} open={open} close={close}>
      <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >Add Liquidity</Text>
      <TokenForm
        currencies={['usdc']}
        value={value}
        onValueChange={(value) => setValue(value)}
        selectedToken="usdc"
        onSelectedTokenChange={() => { }}
        balance={getMember().liquidityCapUsdc}
      />
      <Button
        onClick={async () => { 
          // ADD LIQUIDITY GOES HERE
          await props.callback()
        }}
        margin="35px 0px 0px 0px" gradient width={200} height={50}>
        Add!
      </Button>
    </Modal>
  )

}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  }
});

export default withStyles(useStyles)(AddLiquidity);