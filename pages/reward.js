import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { mdiWalletGiftcard, mdiTrophyAward } from '@mdi/js';

import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Card from '../reusable/card'
import Table from '../reusable/table'
import Weight from '../reusable/weight'
import Button from '../reusable/button'
import MemberSearch from '../components/modals/member-search'
import { useStoreApi } from '../store/provider'
import { getAllocationsTo, getAllocationsFrom, getPool } from '../api/get'
import { allocateRewards } from '../api/post'
import { format, round } from '../utils/money'

const Stake = props => {
  const store = useStoreApi()
  const { getMember, getProtocol, setShowProfile, setShowToast } = store

  const [selectedEpoch, setSelectedEpoch] = useState(getProtocol().epochNumber)
  const [allocationsTo, setAllocationsTo] = useState(undefined)
  const [allocationsFrom, setAllocationsFrom] = useState(undefined)
  const [allocationsToAmount, setAllocationsToAmount] = useState(0)
  const [allocationsFromAmount, setAllocationsFromAmount] = useState(0)
  const [showMemberSearch, setShowMemberSearch] = useState(false)
  const [pool, setPool] = useState({
    dntStaked: 0
  })
  useEffect(() => {
    fetchPool()
    getValueAllocationsTo(0, selectedEpoch)
    getValueAllocationsFrom(0, selectedEpoch)
  }, [])

  async function fetchPool() {
    let pool = await getPool({
      params: {
        epoch: getProtocol().epochNumber
      },
      store
    })
    setPool(pool)
  }

  //No pagination on the "To" table
  async function getValueAllocationsTo(skip, epoch) {
    let data = await getAllocationsTo({
      params: {
        epoch,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data.allocationsTo] : [...allocationsTo, ...data.allocationsTo]
    setAllocationsTo(newTable)
    setAllocationsToAmount(data.allocationsToAmount)
  }

  async function getValueAllocationsFrom(skip, epoch) {
    let data = await getAllocationsFrom({
      params: {
        skip,
        epoch,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data.allocationsFrom] : [...allocationsFrom, ...data.allocationsFrom]
    setAllocationsFrom(newTable)
    setAllocationsFromAmount(data.allocationsFromAmount)
  }

  async function handleRewardAllocation() {
    if (!allocationsToAmount) {
      return setShowToast({ show: true, text: 'Can not reward without points!', reason: 'success' })
    }
    await allocateRewards({
      params: { allocations: allocationsTo },
      store
    })
  }

  function includes(array, cell) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].ethAddress == cell.ethAddress) return true
    }
    return false
  }

  function handleCellClick(cell) {
    const { ethAddress, alias } = cell
    setShowProfile({
      selectedTab: 0,
      selectedEpoch,
      ethAddress,
      alias
    })
  }

  function calculateToPoints(weight) {
    let weights = allocationsTo.reduce((accumulator, reducer) => {
      return accumulator + reducer.weight
    }, 0)
    return format(round(allocationsToAmount * (weight / weights), 3))
  }

  function renderToTableHeader() {
    return <span className={classes.header}>
      <span className={classes.cellWrapper}>
        <Text margin="0px 0px 0px 15px" fontSize={15}>Profile</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 25px 0px 0px" fontSize={15}>Points</Text>
        <Text margin="0px 20px 0px 0px" fontSize={15}>Weight</Text>
      </span>
    </span>
  }
  function renderFromTableHeader() {
    return <span className={classes.header}>
      <span className={classes.cellWrapper}>
        <Text margin="0px 0px 0px 15px" fontSize={15}>Profile</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 15px 0px 0px" fontSize={15}>Points</Text>
      </span>
    </span>
  }

  function renderToCell(cell, i) {
    const { classes } = props
    const { alias, weight, points } = cell

    return <Card onClick={() => handleCellClick(cell)} className={classes.cell}>
      <span className={classes.cellWrapper}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <span className={classes.cellWrapper}>
      <Text margin="0px 15px 0px 0px" fontSize={20}>{calculateToPoints(weight)} Points</Text>
      <Weight
        disabled={selectedEpoch != getProtocol().epochNumber}
        value={weight}
        onChange={(weight) => {
          let newallocationsTo = [...allocationsTo]
          let member = { ...newallocationsTo[i] }
          member.weight = weight
          newallocationsTo[i] = member
          newallocationsTo = newallocationsTo.sort((u1, u2) => {
            u1.weight = u1.weight ? u1.weight : 0
            u2.weight = u2.weight ? u2.weight : 0
            return u1 - u2
          })
          setAllocationsTo(newallocationsTo)
        }}
      />
      </span>
    </Card>
  }

  function renderFromCell(cell) {
    const { classes } = props
    const { alias, weight, points } = cell

    return <Card onClick={() => handleCellClick(cell)} className={classes.cell}>
      <span className={classes.cellWrapper}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{points} Points</Text>
    </Card>
  }

  function renderRewardButton() {
    const { classes } = props
    if (allocationsTo &&
      (selectedEpoch != getProtocol().epochNumber
        || allocationsTo.length <= 0)) return null

    return (
      <span className={classes.buttonContainer}><Button
        gradient
        width={200}
        height={50}
        onClick={() => handleRewardAllocation()}
      >
        Reward!
      </Button></span>
    )
  }

  function calculatePointWorth() {
    const contributorIssuance = getProtocol().dntEpochRewardIssuanceAmount
    const dntPerPoint = pool.dntStaked ? (contributorIssuance / 2) / pool.dntStaked : 0
    return format(dntPerPoint, 3)
  }

  const { classes } = props
  return (
    <div className={classes.stake}>
      <div className={classes.top}>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>Available to Reward</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(allocationsToAmount, 3)} POINTS</Text>
          <Text type="paragraph" fontSize={14} fontWeight={300}>(1 VOTE Received = 1 POINT to reward)</Text>
        </Card>
        <span className={classes.topCard}>
          <Text type="paragraph" fontSize={18} fontWeight={700}>Swap Price</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>
            1 POINT = {calculatePointWorth()} ÐNT
          </Text>
        </span>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>Currently Receiving</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(allocationsFromAmount, 3)} POINTS</Text>
        </Card>
      </div>
      <div className={classes.tables}>
        <div className={classes.left}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>My Allocations</Text>
            <AddIcon
              onClick={() => setShowMemberSearch(true)}
              className={classes.icon}
              fontSize="medium"
            />
          </span>
          {renderToTableHeader()}
          <Table
            width="100%"
            text="You haven't staked anyone"
            list={allocationsTo}
            renderCell={(value, i) => renderToCell(value, i)}
            icon={mdiWalletGiftcard}
            action={() => {
              setShowMemberSearch(true)
            }}
          />
          {renderRewardButton()}
        </div>
        <div className={classes.right}>
          <Text type="paragraph" fontSize={17} fontWeight={700}>Rewarded by</Text>
          {renderFromTableHeader()}
          <Table
            width="100%"
            text='No stakes here!'
            list={allocationsFrom}
            renderCell={value => renderFromCell(value)}
            icon={mdiTrophyAward}
            onScroll={async () => {
              await getValueAllocationsFrom(allocationsFrom.length, selectedEpoch)
            }}
          />
        </div>
      </div>
      <MemberSearch
        selected={allocationsTo}
        open={showMemberSearch}
        close={() => setShowMemberSearch(false)}
        title={'Choose people to stake'}
        action={(selected) => {
          let newSelected = [...allocationsTo]
          for (let i = 0; i < selected.length; i++) {
            if (selected[i].weight == undefined) selected[i].weight = 0
            if (!includes(newSelected, selected[i])) {
              newSelected.push(selected[i])
            }
          }
          setAllocationsTo(newSelected)
          setShowMemberSearch(false)
        }}
      />
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
    padding: 15,
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
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default withStyles(useStyles)(Stake);