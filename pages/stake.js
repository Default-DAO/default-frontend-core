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
import { getStakesTo, getStakesFrom } from '../api/get'
import { delegateStakes } from '../api/post'
import { format, round } from '../utils/money'

const Stake = props => {
  const store = useStoreApi()
  const { getMember, getProtocol, setShowProfile } = store

  const [selectedEpoch, setSelectedEpoch] = useState(getProtocol().epochNumber)
  const [delegationsTo, setDelegationsTo] = useState(undefined)
  const [delegationsFrom, setDelegationsFrom] = useState(undefined)
  const [delegationsToAmount, setDelegationsToAmount] = useState(0)
  const [delegationsFromAmount, setDelegationsFromAmount] = useState(0)
  const [showMemberSearch, setShowMemberSearch] = useState(false)

  useEffect(() => {
    getStakeDelegationsTo(0, selectedEpoch)
    getStakeDelegationsFrom(0, selectedEpoch)
  }, [])

  //No pagination on the "To" table
  async function getStakeDelegationsTo(skip, epoch) {
    let data = await getStakesTo({
      params: {
        epoch,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data.delegationsTo] : [...delegationsTo, ...data.delegationsTo]
    setDelegationsTo(newTable)
    setDelegationsToAmount(data.delegationsToAmount)
  }

  async function getStakeDelegationsFrom(skip, epoch) {
    let data = await getStakesFrom({
      params: {
        skip,
        epoch,
        ethAddress: getMember().ethAddress
      },
      store
    })
    if (!data) return
    let newTable = skip == 0 ? [...data.delegationsFrom] : [...delegationsFrom, ...data.delegationsFrom]
    setDelegationsFrom(newTable)
    setDelegationsFromAmount(data.delegationsFromAmount)
  }

  async function stakeDelegations() {
    await delegateStakes({
      params: { delegations: delegationsTo },
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

  function calculateToVotes(weight) {
    let weights = delegationsTo.reduce((accumulator, reducer) => {
      return accumulator + reducer.weight
    }, 0)
    console.log(weights, delegationsToAmount, weight)
    return format(delegationsToAmount * (weight / weights), 3)
  }

  function renderToTableHeader() {
    return <span className={classes.header}>
      <span className={classes.cellWrapper}>
        <Text margin="0px 0px 0px 15px" fontSize={15}>Profile</Text>
      </span>
      <span className={classes.cellWrapper}>
        <Text margin="0px 25px 0px 0px" fontSize={15}>Votes</Text>
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
        <Text margin="0px 15px 0px 0px" fontSize={15}>Votes</Text>
      </span>
    </span>
  }

  function renderToCell(cell, i) {
    const { classes } = props
    const { alias, weight } = cell

    return <Card onClick={() => handleCellClick(cell)} className={classes.cell}>
      <span className={classes.cellWrapper}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <span className={classes.cellWrapper}>
      <Text margin="0px 15px 0px 0px" fontSize={20}>{calculateToVotes(weight)} Votes</Text>
      <Weight
        disabled={selectedEpoch != getProtocol().epochNumber}
        value={weight}
        onChange={(weight) => {
          let newDelegationsTo = [...delegationsTo]
          let member = { ...newDelegationsTo[i] }
          member.weight = weight
          newDelegationsTo[i] = member
          newDelegationsTo = newDelegationsTo.sort((u1, u2) => {
            u1.weight = u1.weight ? u1.weight : 0
            u2.weight = u2.weight ? u2.weight : 0
            return u1 - u2
          })
          setDelegationsTo(newDelegationsTo)
        }}
      />
      </span>
    </Card>
  }

  function renderFromCell(cell) {
    const { classes } = props
    const { alias, weight, votes } = cell

    return <Card onClick={() => handleCellClick(cell)} className={classes.cell}>
      <span className={classes.cellWrapper}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{votes} Votes</Text>
    </Card>
  }

  function renderStakeButton() {
    const { classes } = props
    if (delegationsTo &&
      (selectedEpoch != getProtocol().epochNumber
        || delegationsTo.length <= 0)) return null

    return (
      <span className={classes.buttonContainer}><Button
        gradient
        width={200}
        height={50}
        onClick={() => stakeDelegations()}
      >
        Stake!
      </Button></span>
    )
  }

  const { classes } = props
  return (
    <div className={classes.stake}>
      <div className={classes.top}>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>Currently Giving</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(delegationsToAmount, 3)} VOTES</Text>
          <Text type="paragraph" fontSize={14} fontWeight={300}>(1 Staked DNT = 1 VOTE)</Text>
        </Card>
        <Card className={classes.topCard}>
          <Text type="paragraph" fontSize={17} fontWeight={500}>Currently Receiving</Text>
          <Text type="subheading" fontSize={25} fontWeight={700}>{format(delegationsFromAmount, 3)} VOTES</Text>
        </Card>
      </div>
      <div className={classes.tables}>
        <div className={classes.left}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={17} fontWeight={700}>My Delegates</Text>
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
            list={delegationsTo}
            renderCell={(value, i) => renderToCell(value, i)}
            icon={mdiWalletGiftcard}
            action={() => {
              setShowMemberSearch(true)
            }}
          />
          {renderStakeButton()}
        </div>
        <div className={classes.right}>
          <Text type="paragraph" fontSize={17} fontWeight={700}>My Voters / Supporters</Text>
          {renderFromTableHeader()}
          <Table
            width="100%"
            text='No stakes here!'
            list={delegationsFrom}
            renderCell={value => renderFromCell(value)}
            icon={mdiTrophyAward}
            onScroll={async () => {
              await getStakeDelegationsFrom(delegationsFrom.length, selectedEpoch)
            }}
          />
        </div>
      </div>
      <MemberSearch
        selected={delegationsTo}
        open={showMemberSearch}
        close={() => setShowMemberSearch(false)}
        title={'Choose people to stake'}
        action={(selected) => {
          let newSelected = [...delegationsTo]
          for (let i = 0; i < selected.length; i++) {
            if (selected[i].weight == undefined) selected[i].weight = 0
            if (!includes(newSelected, selected[i])) {
              newSelected.push(selected[i])
            }
          }
          setDelegationsTo(newSelected)
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