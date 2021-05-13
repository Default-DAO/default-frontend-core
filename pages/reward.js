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
import EpochSelector from '../components/modals/epoch-selector'
import { useStoreApi } from '../store/provider'
import { getAllocations } from '../api/get'
import { allocateRewards } from '../api/post'
import { format } from '../utils/money'

const Reward = props => {
  const store = useStoreApi()
  const { getMember, getProtocol } = store

  const [epochSelectorOpen, setEpochSelectorOpen] = useState(false)
  const [selectedEpoch, setSelectedEpoch] = useState(getProtocol().epochNumber)
  const [allocationsTo, setAllocationsTo] = useState([])
  const [allocationsFrom, setAllocationsFrom] = useState([])
  const [allocationsToAmount, setAllocationsToAmount] = useState(0)
  const [allocationsFromAmount, setAllocationsFromAmount] = useState(0)
  const [showMemberSearch, setShowMemberSearch] = useState(false)

  useEffect(() => {
    getValueAllocations(0, selectedEpoch)
  }, [])

  async function getValueAllocations(page, epoch) {
    let { 
      allocationsFrom, 
      allocationsTo,
      allocationsFromAmount, 
      allocationsToAmount  
    } = await getAllocations({
      params: {
        page,
        epoch,
        ethAddress: getMember().ethAddress
      },
      store
    })
    setAllocationsFrom(allocationsFrom)
    setAllocationsTo(allocationsTo)
    setAllocationsFromAmount(allocationsFromAmount)
    setAllocationsToAmount(allocationsToAmount)
  }

  async function rewardAllocations() {
    await allocateRewards({
      params: {allocations: allocationsTo},
      store
    })
  }

  function renderToCell(cell, i) {
    const { classes } = props
    const { alias, weight } = cell

    return <Card className={classes.cell}>
      <span className={classes.profileContainer}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <Weight
        disabled={selectedEpoch != getProtocol().epochNumber}
        value={weight}
        onChange={(weight) => {
          let newAllocationsTo = [...allocationsTo]
          let selectedMember = { ...newAllocationsTo[i] }
          selectedMember.weight = weight
          newAllocationsTo[i] = selectedMember
          newAllocationsTo = newAllocationsTo.sort((u1, u2) => {
            u1.weight = u1.weight ? u1.weight : 0
            u2.weight = u2.weight ? u2.weight : 0
            return u1 - u2
          })
          setAllocationsTo(newAllocationsTo)
        }}
      />
    </Card>
  }

  function renderFromCell(cell) {
    const { classes } = props
    const { alias, weight } = cell

    return <Card className={classes.cell}>
      <span className={classes.profileContainer}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{alias}</Text>
      </span>
      <Weight
        value={weight}
        disabled
      />
    </Card>
  }

  function renderAllocationButton() {
    const { classes } = props
    let weightSet = false
    allocationsTo.forEach(member => {
      if (member && member.weight && member.weight > 0) {
        weightSet = true
        return
      }
    })
    if (!weightSet) return null
    if (selectedEpoch != getProtocol().epochNumber) return null
    return (
      <span className={classes.buttonContainer}><Button
        gradient
        width={200}
        height={50}
        onClick={() => rewardAllocations()}
      >
        Reward!
      </Button></span>
    )
  }

  const { classes } = props
  // console.log("WHAT")
  return (
    <div className={classes.value}>
      <div className={classes.epoch}>
        <Button
          onClick={() => setEpochSelectorOpen(true)}
          type="secondary" className={classes.epochButton} margin="0px 20px 0px 0px" width={110}>
          Epoch {selectedEpoch}
        </Button>
      </div>
      <div className={classes.tables}>
        <div className={classes.left}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Value To</Text>
            {(selectedEpoch == getProtocol().epochNumber) ?<AddIcon
              onClick={() => setShowMemberSearch(true)}
              className={classes.icon}
              fontSize="small"
            /> : null}
          </span>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={15} fontWeight={700}>Rewarded: {format(allocationsToAmount, 2)}</Text>
          </span>
          <Table
            text="You haven't rewarded anyone"
            list={allocationsTo}
            renderCell={(value, i) => renderToCell(value, i)}
            icon={mdiWalletGiftcard}
            action={(selectedEpoch != getProtocol().epochNumber) ? null : () => {
              setShowMemberSearch(true)}
            }
          />
          {renderAllocationButton()}
        </div>
        <div className={classes.right}>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={20} fontWeight={700}>Value From</Text>
          </span>
          <span className={classes.textContainer}>
            <Text type="paragraph" fontSize={15} fontWeight={700}>Rewarded: {format(allocationsFromAmount, 2)}</Text>
          </span>
          <Table
            text='No rewards here'
            list={allocationsFrom}
            renderCell={value => renderFromCell(value)}
            icon={mdiTrophyAward}
          />
          <MemberSearch
            open={showMemberSearch}
            selected={allocationsTo}
            close={() => setShowMemberSearch(false)}
            title={'Choose people to reward'}
            action={(selected) => {
              let newSelected = [...allocationsTo]
              for (let i = 0; i < selected.length; i ++) {
                if (selected[i].weight == undefined) selected[i].weight = 0
                if (!newSelected.includes(selected[i])) {
                  newSelected.push(selected[i])
                }
              }
              setAllocationsTo(newSelected)
              setShowMemberSearch(false)
            }}
          />
          <EpochSelector
            open={epochSelectorOpen}
            close={() => setEpochSelectorOpen(false)}
            title={'Select epoch'}
            action={(selected) => {
              setSelectedEpoch(selected)
              getValueAllocations(0, selected)
              setEpochSelectorOpen(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = theme => ({
  value: {
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

export default withStyles(useStyles)(Reward);