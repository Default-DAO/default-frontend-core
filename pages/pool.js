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
import { getPool, getMemberPool, getMemberUsdcHistory, getMemberDntHistory } from '../api/get'
import { format, round } from '../utils/money'

const transactionTypes = {
  STAKE: 'Stake',
  CONTRIBUTOR_REWARD: 'Contributor Reward',
  LP_REWARD: 'LP Reward',
  DEPOSIT: 'Deposit',
  WITHDRAW: "Withdraw",
  SWAP: "Swap"
}

const Pool = props => {
  const store = useStoreApi()
  const { getMember, memberPool, pool} = store
  const [showAddLiquidity, setShowAddLiquidity] = useState(false)
  const [showStakeLiquidity, setShowStakeLiquidity] = useState(false)
  const [usdcHistory, setUsdcHistory] = useState(undefined)
  const [dntHistory, setDntHistory] = useState(undefined)

  useEffect(() => {
    fetchPool()
    fetchMemberUsdcHistory()
    fetchMemberDntHistory()
  }, [])

  async function fetchPool() {
    await getPool({
      params: {},
      store
    })
    await getMemberPool({
      params: {
        ethAddress: getMember().ethAddress
      },
      store
    })
  }

  async function fetchMemberUsdcHistory(skip) {
    let newHistory = await getMemberUsdcHistory({
      params: {
        ethAddress: getMember().ethAddress,
        skip: skip ? skip : 0
      },
      store
    })
    let oldHistory = usdcHistory ? usdcHistory : []
    let newTable = skip == 0 ? [...newHistory] : [...oldHistory, ...newHistory]
    setUsdcHistory(newTable)
  }

  async function fetchMemberDntHistory(skip) {
    let newHistory = await getMemberDntHistory({
      params: {
        ethAddress: getMember().ethAddress,
        skip: skip ? skip : 0
      },
      store
    })

    let oldHistory = dntHistory ? dntHistory : []
    let newTable = skip == 0 ? [...newHistory] : [...oldHistory, ...newHistory]
    setDntHistory(newTable)
  }

  function renderUsdcHistoryHeader() {
    return <div className={classes.header}>
      <p className={classes.headerText} style={{ flex: 2 }}>Amount</p>
      <p className={classes.headerText} style={{ flex: 1 }}>Epoch</p>
      <p className={classes.headerText} style={{ flex: 1 }}>Transaction</p>
      <p className={classes.headerText} style={{
        flex: 1, textAlign: 'right'
      }}>Status</p>
    </div>
  }

  function renderUsdcHistoryCell(cell) {
    let { amount, createdEpoch, transactionType, status } = cell
    transactionType = transactionTypes[transactionType] ? transactionTypes[transactionType] : transactionType
    return <div className={classes.historyCell}>
      <p className={classes.historyText} style={{ flex: 2 }}>{format(round(amount, 3))} USDC</p>
      <p className={classes.historyText} style={{ flex: 1 }}>Epoch {createdEpoch}</p>
      <p className={classes.historyText} style={{ flex: 1 }}>{transactionType}</p>
      <p className={classes.historyText} style={{
        flex: 1, textAlign: 'right',
        color: keys.GREEN
      }}>Verified</p>
    </div>
  }

  function renderDntHistoryHeader() {
    return <div className={classes.header}>
      <p className={classes.headerText} style={{ flex: 1.5 }}>Amount</p>
      <p className={classes.headerText} style={{ flex: 1 }}>Epoch</p>
      <p className={classes.headerText} style={{ flex: 1, textAlign: 'right' }}>Transaction</p>
    </div>
  }

  function renderDntHistoryCell(cell) {
    let { amount, createdEpoch, transactionType } = cell
    transactionType = transactionTypes[transactionType] ? transactionTypes[transactionType] : transactionType
    return <div className={classes.historyCell}>
      <p className={classes.historyText} style={{ flex: 1.5 }}>{format(round(amount, 3))} DNT</p>
      <p className={classes.historyText} style={{ flex: 1 }}>Epoch {createdEpoch}</p>
      <p className={classes.historyText} style={{ flex: 1, textAlign: 'right' }}>{transactionType}</p>
    </div>
  }

  const { classes } = props
  return (
    <div className={classes.pool}>
      <div className={classes.top}>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={700}>USDC Liquidity Pool</Text>
          <Text type="subheading" fontSize={35} fontWeight={700}>$ {format(pool.usdc, 3)}</Text>
        </Card>
        <span className={classes.topCard}>
          <Text type="paragraph" fontSize={18} fontWeight={700}>Swap Price</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>
            1 ÐNT = {format(round(pool.usdc / pool.dnt, 2))} USDC
          </Text>
        </span>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={700}>DNT Liquidity Pool</Text>
          <Text type="subheading" fontSize={35} fontWeight={700}>Ð {format(pool.dnt, 3)}</Text>
        </Card>
      </div>
      <div className={classes.bottom}>

        <Card className={classes.bottomCard}>
          <span className={classes.bottomTextContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>My USDC Liquidity</Text>
          </span>
          <span className={classes.bottomTextContainer}>
            <span className={classes.bottomTextWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                Ð {format(memberPool.usdc, 3)}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                In LP Pool
              </Text>
            </span>
            <div className={classes.verticalLine}></div>
            <span className={classes.bottomTextWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                $ {getMember().liquidityCapUsdc}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                Available to Add
              </Text>
            </span>
          </span>
          <span className={classes.buttonContainer}>
            <Button
              onClick={() => setShowAddLiquidity(true)}
              gradient width={130} height={35}>
              Add Liquidity
          </Button>
          </span>
          {renderUsdcHistoryHeader()}
          <Table
            className={classes.table}
            text='No liquidity history'
            list={usdcHistory}
            renderCell={renderUsdcHistoryCell}
            icon={mdiShareVariantOutline}
            width="100%"
            height="100%"
            onScroll={async () => {
              await fetchMemberUsdcHistory(usdcHistory.length)
            }}
          />
        </Card>

        <Card className={classes.bottomCard}>
          <span className={classes.bottomTextContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>My DNT Liquidity</Text>
          </span>
          <span className={classes.bottomTextContainer}>
            <span className={classes.bottomTextWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                Ð {format(memberPool.dnt, 3)}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                In LP Pool
              </Text>
            </span>
            <div className={classes.verticalLine}></div>
            <span className={classes.bottomTextWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                Ð {format(memberPool.dntStaked, 3)}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                Staked ÐNT
              </Text>
            </span>
          </span>
          <span className={classes.buttonContainer}>
            <Button
              onClick={() => {
                setShowStakeLiquidity(true)
              }}
              gradient width={130} height={35}>
              STAKE</Button>
          </span>
          {renderDntHistoryHeader()}
          <Table
            className={classes.table}
            text='No DNT history'
            list={dntHistory}
            renderCell={renderDntHistoryCell}
            icon={mdiShareVariantOutline}
            width="100%"
            height="100%"
            onScroll={async () => {
              await fetchMemberDntHistory(dntHistory.length)
            }}
          />
        </Card>

      </div>
      <AddLiquidity
        open={showAddLiquidity}
        close={() => setShowAddLiquidity(false)}
        callback={() => {
          fetchPool()
          fetchMemberUsdcHistory(0)
        }}
      />
      <StakeModal
        open={showStakeLiquidity}
        close={() => setShowStakeLiquidity(false)}
        title="Stake Your DNT"
        label="Stake DNT"
        buttonLabel="Stake"
        callback={() => {
          fetchPool()
          fetchMemberDntHistory(0)
        }}
      />
    </div>
  )
}

const useStyles = theme => ({
  pool: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '20px 90px',
    overflowY: 'hidden'
  },
  top: {
    display: 'flex',
    flexDirection: 'row'
  },
  topCard: {
    flex: 1,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  bottomCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '60vh'
  },
  bottomTextContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  verticalLine: {
    borderLeft: `1px solid ${keys.WHITE}`,
    height: 50,
    opacity: 0.4
  },
  bottomTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  table: {
    flex: 1,
    marginTop: 0
  },
  header: {
    marginTop: 20,
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  historyCell: {
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    color: keys.WHITE,
    fontWeight: 700,
    fontSize: 14,
    flex: 1,
    margin: 0
  },
  historyText: {
    color: keys.WHITE,
    fontWeight: 500,
    fontSize: 14,
    flex: 1,
    margin: 0
  }
});

export default withStyles(useStyles)(Pool);