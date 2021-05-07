import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '../reusable/button'
import Form from '../reusable/form'
import Text from '../reusable/text'
import { useWeb3, registerWallet } from '../api/web3'
import { useStoreApi } from '../store/provider'
import {registerMember} from '../api/post'

const Register = (props) => {
  const store = useStoreApi()
  const {showToast, setShowToast, ethAddress, setEthAddress} = store
  const [alias, setAlias] = useState('')

  const { classes } = props
  return (
    <div className={classes.register}>
      <span className={classes.registerContainer}>
        <Text className={classes.logo} type='heading' fontSize={100} fontWeight={700}>Ðefault</Text>
        <Form
          value={alias}
          center
          className={classes.form}
          onChange={(text) => {
            setAlias(text)
          }}
          width={280}
          placeholder="Enter your alias"></Form><br />
        <Button
          gradient width={300} height={40}
          onClick={async () => {
            if (alias.length < 3) {
              return setShowToast({show: true, text: "Please make your alias longer than 3 characters!", reason:'error'})
            }

            let newEthAddress = await registerWallet()
            let member = await registerMember({
              params: {
                alias
              },
              store
            })
          }}
        >
          Register
        </Button>
        {/* <Button
          gradient width={300} height={40}
          onClick={async () => {
            console.log(ethAddress)
          }}
        >
          GETAD
        </Button> */}
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