import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { mdiShareVariantOutline } from '@mdi/js';

import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Button from '../reusable/button'
import Card from '../reusable/card'
import Table from '../reusable/table'
import { useStoreApi } from '../store/provider'
import { getProposals } from '../api/get'
import { format } from '../utils/money'
import ProposalDetail from '../components/proposals/view'
import clsx from 'clsx'

const Proposals = props => {
  const store = useStoreApi()
  const { getProtocol, setShowProfile, getMember } = store

  const [proposals, setProposals] = useState(undefined)
  const [selectedProposal, setSelectedProposal] = useState(undefined)

  useEffect(() => {
    loadProposals()
  }, [])

  async function loadProposals() {
    let data = await getProposals({
      store
    })
    if (!data) return
    setProposals(data.proposals)
  }

  function renderTableHeader() {
    return <span className={classes.header}>
      <span className={classes.cellTop}>
        <Text fontWeight={700} className={classes.cellRowLeft}>Category</Text>
        <Text fontWeight={700} className={classes.cellRowRight}>Is Active</Text>
        <Text fontWeight={700} className={classes.cellRowRight}>Until</Text>
        <Text fontWeight={700} className={classes.cellRowRight}>Proposer</Text>
        <Text fontWeight={700} className={classes.cellRowRight}>Progress</Text>
      </span>
    </span>
  }

  function roundDecimal(value) {
    return (Math.round(value * 100) / 100) * 100
  }

  function renderProposalCell(cell) {
    const { classes } = props
    const {
      name,
      desc,
      category,
      isActive,
      duration,
      epoch,
      proposerAlias,
      isApproved,
      inFavorOfCount,
      againstCount
    } = cell

    return <Card onClick={() => setSelectedProposal(cell)} className={classes.cell}>
      <span className={classes.cellTop}>
        <Text className={clsx(classes.cellRowLeft, classes.bold)}>{category}</Text>
        <Text className={clsx(classes.cellRowRight, isActive ? classes.greenCell : classes.redCell)}>
          {isActive ? "Active" : "Inactive"}
        </Text>
        <Text className={classes.cellRowRight}>Epoch {Number(epoch) + Number(duration)}</Text>
        <Text className={classes.cellRowRight}>{proposerAlias}</Text>
        <div>
          <Text className={clsx(classes.cellRowRight, classes.greenCell)}>{inFavorOfCount} Yes</Text>
          <Text className={clsx(classes.cellRowRight, classes.redCell)}>{againstCount} No</Text>
        </div>
      </span>
      <span className={classes.cellBottom}>
        <span className={classes.descriptionCell}>
          <Text className={classes.name}>"{name}"</Text>
          <Text className={classes.description}>{desc.slice(0, 200) + '...'}</Text>
        </span>
        <Button
          gradient
          onClick={() => {
            setSelectedProposal(cell)
          }}
          className={classes.viewDetail}
        >
          View Detail
        </Button>
      </span>
    </Card>
  }

  const { classes } = props
  return (
    <div className={classes.container}>
      <div className={classes.proposal}>
        <div className={classes.header}>
          <Text type="paragraph" fontSize={20} fontWeight={700}>Proposals</Text>
          {/* <Button
            gradient
            onClick={() => {

            }}
          >
            Create Proposal
          </Button> */}
        </div>
        <div className={classes.table}>
          {renderTableHeader()}
          <Table
            text='No proposals to show'
            list={proposals}
            renderCell={value => renderProposalCell(value)}
            icon={mdiShareVariantOutline}
            width="100%"
            height="60vh"
            onScroll={async () => {
              // await loadProposals()
            }}
          />
        </div>
      </div>
      <ProposalDetail
        selectedProposal={selectedProposal}
        close={() => setSelectedProposal(false)}
      />
    </div>
  )
}

const useStyles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0px 200px'
  },
  proposal: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden',
    width: '100%',
    padding: '30px 0px',
    // height: '80vh'
  },
  epochButton: {
    fontWeight: 700,
    fontSize: 15,
    padding: '8px 10px'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cell: {
    marginBottom: 20,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '17px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '17px 20px 10px 20px'
  },
  cellTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cellBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%'
  },
  cellRowLeft: {
    width: 200,
    textAlign: 'left'
  },
  cellRowRight: {
    width: 150,
    textAlign: 'right'
  },
  descriptionCell: {
    marginTop: 15
  },
  bold: {
    fontWeight: 700
  },
  greenCell: {
    color: keys.GREEN,
  },
  redCell: {
    color: keys.RED
  },
  name: {
    fontWeight: 700,
    marginBottom: 10,
  },
  description: {

  },
  viewDetail: {
    height: 35,
    width: 170,
    fontSize: 12
  }
});

export default withStyles(useStyles)(Proposals);