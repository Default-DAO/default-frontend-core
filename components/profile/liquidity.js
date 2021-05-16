import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Text from '../../reusable/text'
import Card from '../../reusable/card'
import { useStoreApi } from '../../store/provider'
import { getMemberPool } from '../../api/get'
import { format } from '../../utils/money'

const Liquidity = props => {
  const {ethAddress} = props
  const store = useStoreApi()
  const [memberPool, setMemberPool] = useState({
    usdc: 0,
    dnt: 0,
    dntStaked: 0
  })

  useEffect(() => {
    getPoolInformation()
  }, [])

  async function getPoolInformation() {
    let memberPool = await getMemberPool({
      params: {
        ethAddress
      },
      store
    })
    setMemberPool(memberPool)
  }

  const { classes } = props
  return (
    <div className={classes.pool}>
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={15} fontWeight={700}>DNT</Text>
          </span>
          <Text type="heading" fontSize={25} fontWeight={700}>Ð {format(memberPool.dnt)}</Text>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={15} fontWeight={700}>Staked DNT</Text>
          </span>
          <Text type="heading" fontSize={25} fontWeight={700}>Ð {format(memberPool.dntStaked)}</Text>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={15} fontWeight={700}>USDC</Text>
          </span>
          <Text type="heading" fontSize={25} fontWeight={700}>$ {format(memberPool.usdc)}</Text>
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
    padding: '20px 90px',
    overflowY: 'auto'
  },
  wrapper: {
    width: '600px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    margin: 10,
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

export default withStyles(useStyles)(Liquidity);