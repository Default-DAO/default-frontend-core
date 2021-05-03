import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '../reusable/button'
import Form from '../reusable/form'
import Text from '../reusable/text'
import { useWeb3, setUserAccount } from '../api/web3'
import { useStoreApi } from '../redux/provider'

const Register = (props) => {
  const {showToast, setShowToast} = useStoreApi()
  const [alias, setAlias] = useState('')

  const { classes } = props
  return (
    <div className={classes.register}>
      <span className={classes.registerContainer}>
        <Text className={classes.logo} type='heading' fontSize={100} fontWeight={700}>Ðefault</Text>
        <Form
          value={'e'}
          center
          className={classes.form}
          onChange={(text) => {
            if (text.length > 0 && text[0] != '@') {
              text = '@' + text
            }
            setAlias(text)
          }}
          width={280}
          placeholder="Enter your alias"></Form><br />
        <Button
          gradient width={300} height={40}
          onClick={async () => {
            
          }}
        >
          Register
        </Button>
      </span>
    </div>
  )

}

const useStyles = theme => ({
  register: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 120,
  },
  subtext: {
    opacity: 0.8,
  },
  form: {
    fontSize: 20
  }
});

export default withStyles(useStyles)(Register);