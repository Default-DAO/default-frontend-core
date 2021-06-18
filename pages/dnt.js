import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { mdiWalletGiftcard, mdiTrophyAward } from '@mdi/js';

import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Card from '../reusable/card'
import Table from '../reusable/table'
import Weight from '../reusable/weight'
import Button from '../reusable/button'
import { useStoreApi } from '../store/provider'
import { getStakeRanking, getMemberStakeHistory, getPool, getMemberPool } from '../api/get'
import { delegateStakes } from '../api/post'
import { format, round } from '../utils/money'
import { daysToEpoch } from '../utils/epoch'

const Stake = props => {
  const store = useStoreApi()
  const { getMember, getProtocol, setShowProfile, pool, memberPool } = store

  const [selectedEpoch, setSelectedEpoch] = useState(getProtocol().epochNumber)
  const [stakeRanking, setStakeRanking] = useState(undefined)
  const [stakeHistory, setStakeHistory] = useState(undefined)

  useEffect(() => {
    fetchPool()
    fetchStakeRanking(0)
    fetchMemberStakeHistory(0)
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

  //No pagination on the "To" table
  async function fetchStakeRanking(skip) {
    let data = await getStakeRanking({
      params: {
        skip,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data] : [...stakeRanking, ...data]
    
    setStakeRanking(newTable)
  }

  async function fetchMemberStakeHistory(skip) {
    let data = await getMemberStakeHistory({
      params: {
        skip,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data] : [...stakeHistory, ...data]
    setStakeHistory(newTable)
  }

  function handleCellClick(cell) {
    const { ethAddress, alias } = cell
    setShowProfile({
      ethAddress,
      alias,
      selectedEpoch: getProtocol().epochNumber
    })
  }
  
  function renderRankingHeader() {
    return <span className={classes.header}>
      <span className={classes.cellWrapper}>
        <Text margin="0px 0px 0px 15px" fontSize={15}>Alias</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 25px 0px 0px" fontSize={15}>Amount</Text>
        <Text margin="0px 20px 0px 0px" fontSize={15}>% Total</Text>
      </span>
    </span>
  }
  function renderHistoryHeader() {
    return <span className={classes.header}>
      <span className={classes.cellWrapper}>
        <Text margin="0px 0px 0px 15px" fontSize={15}>Amount</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 15px 0px 0px" fontSize={15}>Unlocked in</Text>
      </span>
    </span>
  }

  function renderRankingCell(cell, i) {
    const { classes } = props
    const { alias, sum } = cell

    return <Card onClick={() => handleCellClick(cell)} className={classes.cell}>
      <span className={classes.cellWrapper}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 25px 0px 0px" fontSize={15}>{format(sum.amount, 3)} DNT</Text>
        <Text margin="0px 20px 0px 0px" fontSize={15}>{
          format(sum.amount / pool.dntStaked * 100, 3)
        }%</Text>
      </span>
    </Card>
  }

  function renderHistoryCell(cell) {
    const { classes } = props
    const { amount, createdEpoch } = cell

    return <Card className={classes.cell}>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{format(amount, 3)} DNT</Text>
      <Text margin="0px 0px 0px 15px" fontSize={20}>Epoch {createdEpoch + daysToEpoch(730)}</Text>
    </Card>
  }

  const { classes } = props
  return (
    <div className={classes.stake}>
      <div className={classes.top}>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>Total DNT Staked</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(pool.dntStaked, 3)} DNT</Text>
        </Card>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>My Staked DNT</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(memberPool.dntStaked, 3)} DNT</Text>
        </Card>
      </div>
      <div className={classes.tables}>
        <div className={classes.left}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>Top Stakers</Text>
          </span>
          {renderRankingHeader()}
          <Table
            width="100%"
            text="You haven't staked anyone"
            list={stakeRanking}
            renderCell={(value, i) => renderRankingCell(value, i)}
            icon={mdiWalletGiftcard}
          />
        </div>
        <div className={classes.right}>
          <Text type="paragraph" fontSize={17} fontWeight={700}>Vesting Timeline</Text>
          {renderHistoryHeader()}
          <Table
            width="100%"
            text='No stakes here!'
            list={stakeHistory}
            renderCell={value => renderHistoryCell(value)}
            icon={mdiTrophyAward}
            onScroll={async () => {
              await getMemberStakeHistory(stakeHistory.length, selectedEpoch)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = theme => ({
  stake: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden',
    padding: '30px 100px',
    // height: '80vh'
  },
  top: {
    display: 'flex',
    flexDirection: 'row'
  },
  topCard: {
    // width: 200,
    flex: 1,
    padding: 20,
    margin: '0px 10px 25px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  epoch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    marginBottom: 25,
    marginLeft: 15,
    width: '100%'
  },
  epochButton: {
    fontWeight: 700,
    fontSize: 15,
    padding: '8px 10px'
  },
  tables: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0px 20px',
    height: '60vh'
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0px 20px',
    height: '60vh'
  },
  cell: {
    marginBottom: 15,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '14px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  cellWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: keys.WHITE,
    cursor: 'pointer',
    marginLeft: 10,
    '&:hover': {
      opacity: 0.7
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: "center",
    marginTop: 28
  },
  header: {
    padding: '0px 20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default withStyles(useStyles)(Stake);