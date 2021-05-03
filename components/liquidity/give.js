import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'

const StakeReward = props => {
  const [value, setValue] = useState('')

  const { classes, open, close, configurations, title, label, buttonLabel } = props
  return (
    <Modal width={400} className={classes.modal} open={open} close={close}>
      <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
      <TokenForm
        currencies={['dnt']}
        value={value}
        onValueChange={(value) => setValue(value)}
        selectedToken="dnt"
        onSelectedTokenChange={() => { }}
        label={label}
      />
      <Button
        onClick={() => { }}
        margin="35px 0px 0px 0px" gradient width={200} height={50}>
        {buttonLabel}
      </Button>
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  }
});

export default withStyles(useStyles)(StakeReward);