import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'
import Button from '../reusable/button'
import Text from '../reusable/text'
import Card from '../reusable/card'
import { useStoreApi } from '../store/provider'
import { getPool, getMemberPool } from '../api/get'
import { format } from '../utils/money'

const Pool = props => {
  const store = useStoreApi()
  const {setShowAddLiquidity, setShowSwapLiquidity, setShowStakeLiquidity, getMember} = store
  const [pool, setPool] = useState({
    usdc: 0,
    dnt: 0,
    dntStaked: 0
  })
  const [memberPool, setMemberPool] = useState({
    usdc: 0,
    dnt: 0,
    dntStaked: 0
  })

  useEffect(() => {
    getPoolInformation()
  }, [])

  async function getPoolInformation() {
    let pool = await getPool({
      params: {},
      store
    })
    let memberPool = await getMemberPool({
      params: {
        ethAddress: getMember().ethAddress
      },
      store
    })
    setPool(pool)
    setMemberPool(memberPool)
  }

  function calculateShare(total, owned) {
    if (!total) return 0
    return Math.round(owned / total * 100 * 100) / 100
  }

  const { classes } = props
  return (
    <div className={classes.pool}>
      <div className={classes.left}>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Total DNT</Text>
          </span>
          <Text type="heading" fontSize={70} fontWeight={700}>Ð {format(pool.dnt, 3)}</Text>
          {/* <Button
            onClick={() => setShowAddLiquidity(true)}
            gradient width={200} height={50}>
            ADD LIQUIDITY</Button> */}
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Total USDC</Text>
          </span>
          <Text type="heading" fontSize={70} fontWeight={700}>$ {format(pool.usdc, 3)}</Text>
          {/* <Button
            gradient width={200} height={50}
            onClick={() => setShowSwapLiquidity(true)}
          >SWAP</Button> */}
        </Card>
      </div>
      <div className={classes.right}>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My DNT</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
              {calculateShare(pool.dnt, memberPool.dnt)} %
            </Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>Ð {format(memberPool.dnt, 3)}</Text>
          <span className={classes.buttonContainer}>
            <Button
              onClick={() => {
                setShowStakeLiquidity(true)
              }}
              gradient width={100} height={30}>
              STAKE</Button>
          </span>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My Staked DNT</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
              {calculateShare(memberPool.dnt, memberPool.dntStaked)} %
            </Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>Ð {format(memberPool.dntStaked, 3)}</Text>
        </Card>
        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={18} fontWeight={700}>My USDC</Text>
            <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
              {calculateShare(pool.usdc, memberPool.usdc)} %
            </Text>
          </span>
          <Text type="heading" fontSize={40} fontWeight={700}>$ {format(memberPool.usdc, 3)}</Text>
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
    overflowY: 'hidden'
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