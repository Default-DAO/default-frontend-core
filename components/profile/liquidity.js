import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { mdiShareVariantOutline } from '@mdi/js';

import Text from '../../reusable/text'
import Card from '../../reusable/card'
import Table from '../../reusable/table'
import { useStoreApi } from '../../store/provider'
import { getMemberPool, getMemberUsdcHistory, getMemberDntHistory } from '../../api/get'
import { format, round } from '../../utils/money'
import keys from '../../config/keys'

const transactionTypes = {
  STAKE: 'Stake',
  CONTRIBUTOR_REWARD: 'Contributor Reward',
  LP_REWARD: 'LP Reward',
  DEPOSIT: 'Deposit',
  WITHDRAW: "Withdraw",
  SWAP: "Swap"
}

const Liquidity = props => {
  const {ethAddress} = props
  const store = useStoreApi()
  const {getMember} = store
  const [memberPool, setMemberPool] = useState({
    usdc: 0,
    dnt: 0,
    dntStaked: 0
  })
  const [usdcHistory, setUsdcHistory] = useState(undefined)
  const [dntHistory, setDntHistory] = useState(undefined)

  useEffect(() => {
    getPoolInformation()
    fetchMemberUsdcHistory()
    fetchMemberDntHistory()
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

  async function fetchMemberUsdcHistory(skip) {
    let newHistory = await getMemberUsdcHistory({
      params: {
        ethAddress,
        skip: skip ? skip : 0
      },
      store
    })
    console.log(usdcHistory)
    let oldHistory = usdcHistory ? usdcHistory : []
    let newTable = skip == 0 ? [...newHistory] : [...oldHistory, ...newHistory]
    setUsdcHistory(newTable)
  }

  async function fetchMemberDntHistory(skip) {
    let newHistory = await getMemberDntHistory({
      params: {
        ethAddress,
        skip: skip ? skip : 0
      },
      store
    })
    let oldHistory = dntHistory ? dntHistory : []
    let newTable = skip == 0 ? [...newHistory] : [...oldHistory, ...newHistory]
    setDntHistory(newTable)
  }

  function getEpochInvestment() {
    if (!usdcHistory || !usdcHistory.length) return 0
    return usdcHistory && usdcHistory[0].createdEpoch == store.getProtocol().epochNumber 
      ? usdcHistory[0].amount : 0
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
      <div className={classes.wrapper}>
      <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>USDC Liquidity</Text>
          </span>
          <span className={classes.textContainer}>
            <span className={classes.textWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                $ {format(memberPool.usdc, 3)}
                {/* ( {calculateShare(pool.usdc, memberPool.usdc)} % ) */}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                In LP Pool
              </Text>
            </span>
            <div className={classes.verticalLine}></div>
            <span className={classes.textWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                $ {getEpochInvestment()}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                Current Epoch
              </Text>
            </span>
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

        <Card className={classes.card}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>DNT Liquidity</Text>
          </span>
          <span className={classes.textContainer}>
            <span className={classes.textWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                $ {format(memberPool.dnt, 3)}
                {/* ( {calculateShare(pool.usdc, memberPool.usdc)} % ) */}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                In LP Pool
              </Text>
            </span>
            <div className={classes.verticalLine}></div>
            <span className={classes.textWrapper}>
              <Text type="paragraph" fontSize={18} fontWeight={700}>
                Ð {format(memberPool.dntStaked, 3)}
              </Text>
              <Text type="paragraph" fontSize={15} fontWeight={500} color={keys.PRIMARY_COLOR}>
                Staked ÐNT
              </Text>
            </span>
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
    </div>
  )
}

const useStyles = theme => ({
  pool: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: '10px 0px',
    overflowY: 'auto'
  },
  wrapper: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  pool: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px 60px 20px 60px',
    overflowY: 'hidden'
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '60vh'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  verticalLine: {
    borderLeft: `1px solid ${keys.WHITE}`,
    height: 50,
    opacity: 0.4
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200
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

export default withStyles(useStyles)(Liquidity);