import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'
import Button from '../reusable/button'
import Text from '../reusable/text'
import Card from '../reusable/card'
import { useStoreApi } from '../redux/provider'

const Pool = props => {
  const {setShowAddLiquidity} = useStoreApi()

  const { classes } = props
  return (
    <div className={classes.pool}>
      <div className={classes.left}>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Total DNT</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>+0.8%</Text>
          </span>
          <Text type="heading" fontSize={70} fontWeight={700}>Ð 1,000,000</Text>
          <Button
            onClick={() => setShowAddLiquidity(true)}
            gradient width={200} height={50}>
            ADD LIQUIDITY</Button>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Total USDC</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>+0.8%</Text>
          </span>
          <Text type="heading" fontSize={70} fontWeight={700}>$ 1,000,000</Text>
          <Button
            gradient width={200} height={50}
            onClick={() => setShowSwapLiquidity(true)}
          >SWAP</Button>
        </Card>
      </div>
      <div className={classes.right}>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My DNT</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>8.0%</Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>Ð 1,000,000</Text>
          <span className={classes.buttonContainer}>
            <Button
              onClick={() => {
                window.location.replace("/stake")
              }}
              gradient width={100} height={30}>
              STAKE</Button>
          </span>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My Staked DNT</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>8.0%</Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>Ð 1,000,000</Text>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My USDC</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>8.0%</Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>$ 1,000,000</Text>
        </Card>
      </div>
    </div>
  )
}

const useStyles = theme => ({
  pool: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: '20px 90px'
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export default withStyles(useStyles)(Pool);