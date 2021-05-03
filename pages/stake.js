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
import StakeModal from '../components/liquidity/give'
import { useStoreApi } from '../store/provider'

const Stake = props => {
  const {setShowAddStakeNetwork} = useStoreApi()

  const [stakeTo, setStakeTo] = useState([...keys.DUMMY_USERS])
  const [stakeFrom, setStakeFrom] = useState([...keys.DUMMY_USERS])
  const [stakeDntOpen, setStakeDntOpen] = useState(false)

  function renderToCell(cell, i) {
    const { classes } = props
    return <Card className={classes.cell}>
      <span className={classes.profileContainer}>
        <Avatar user={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
      </span>
      <Weight
        value={cell.weight}
        onChange={(weight) => {
          let newStakeTo = [...stakeTo]
          let user = { ...newStakeTo[i] }
          user.weight = weight
          newStakeTo[i] = user
          newStakeTo = newStakeTo.sort((u1, u2) => {
            u1.weight = u1.weight ? u1.weight : 0
            u2.weight = u2.weight ? u2.weight : 0
            return u1 - u2
          })
          setStakeTo(newStakeTo)
        }}
      />
    </Card>
  }

  function renderFromCell(cell) {
    const { classes } = props
    return <Card className={classes.cell}>
      <span className={classes.profileContainer}>
        <Avatar size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
      </span>
      <Weight
        value={cell.weight}
        disabled
      />
    </Card>
  }

  function renderStakeButton() {
    const { classes } = props
    let weightSet = false
    stakeTo.forEach(user => {
      if (user && user.weight && user.weight > 0) {
        weightSet = true
        return
      }
    })
    if (!weightSet) return null
    return (
      <span className={classes.buttonContainer}><Button
        gradient
        width={200}
        height={50}
        onClick={() => setStakeDntOpen(true)}
      >
        Stake!
      </Button></span>
    )
  }

  const { classes } = props
  return (
    <div className={classes.stake}>
      <div className={classes.epoch}>
        <Button type="secondary" className={classes.epochButton} margin="0px 20px 0px 0px" width={110}>Epoch 1</Button>
        <Text type="subheading" fontSize={18} fontWeight={600}>Ends in 00:00:04</Text>
      </div>
      <div className={classes.tables}>
        <div className={classes.left}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Stake To</Text>
            <AddIcon
              onClick={() => setShowAddStakeNetwork(true)}
              className={classes.icon}
              fontSize="small"
            />
          </span>
          <Table
            text='Your stake network is empty!'
            list={stakeTo}
            renderCell={(value, i) => renderToCell(value, i)}
            icon={mdiWalletGiftcard}
            action={() => setShowAddStakeNetwork(true)}
          />
          {renderStakeButton()}
        </div>
        <div className={classes.right}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Stake From</Text>
          </span>
          <Table
            text='Nobody has staked to you yet!'
            list={stakeFrom}
            renderCell={value => renderFromCell(value)}
            icon={mdiTrophyAward}
          />
        </div>
      </div>
      <StakeModal
        open={stakeDntOpen}
        close={() => setStakeDntOpen(false)}
        title="Stake Your DNT"
        label="Stake DNT"
        buttonLabel="Stake"
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
    padding: '30px 200px',
    // height: '80vh'
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
    margin: '0px 20px',
    height: '72vh'
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
    height: '72vh'
  },
  cell: {
    marginBottom: 20,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '17px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    color: keys.WHITE,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: "center",
    marginTop: 28
  }
});

export default withStyles(useStyles)(Stake);