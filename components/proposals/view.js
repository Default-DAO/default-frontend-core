import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../reusable/button'
import Table from '../../reusable/table'
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import { useStoreApi } from '../../store/provider'
import keys from '../../config/keys'
import { getProposal } from '../../api/get'
import {createVote} from '../../api/post'

const ProposalDetail = props => {
  const store = useStoreApi()
  const { getProtocol, getMember } = store
  const { classes, selectedProposal, close } = props
  const [proposal, setProposal] = useState(false)

  useEffect(() => {
    if (!selectedProposal) return
    loadProposal(selectedProposal.id)
  }, [selectedProposal])

  if (!selectedProposal) return null
  const {
    id,
    name,
    category,
    desc,
  } = selectedProposal

  async function loadProposal(id) {
    let proposal = await getProposal({
      params: {
        id
      },
      store,
    })
    if (!proposal) return
    setProposal({
      ...selectedProposal,
      ...proposal
    })
  }

  async function castVote(inFavorOf) {
    await createVote({
      params: {
        proposalId: proposal.id,
        inFavorOf
      },
      store
    })
    loadProposal(proposal.id)
  }

  function roundDecimal(value) {
    return (Math.round(value * 100) / 100)
  }

  function renderTableHader() {
    return <span className={classes.cell}>
      <Text className={classes.tableHeaderText}>Alias</Text>
      <Text className={classes.tableHeaderText}>Votes</Text>
    </span>
  }

  function renderTableCell(cell) {
    const { alias, voteCount } = cell
    console.log(cell)
    return <span className={classes.cell}>
      <Text className={classes.cellText}>{alias}</Text>
      <Text className={classes.cellText}>{voteCount}</Text>
    </span>
  }

  function renderTables() {
    if (!proposal) return null
    let votesInFavor = []
    let votesAgainst = []
    for (let i = 0; i < proposal.votes.length; i++) {
      let p = proposal.votes[i]
      if (p.inFavorOf) {
        votesInFavor.push(p)
      } else {
        votesAgainst.push(p)
      }
    }

    let inFavorTotal = votesInFavor.reduce((total, v) => total += v.voteCount, 0)
    let againstTotal = votesAgainst.reduce((total, v) => total += v.voteCount, 0)
    const { votes } = proposal
    return <span className={classes.tables}>
      <span className={classes.tableContainer}>
        <span className={classes.tableTextContainer}>
          <Text className={classes.tableText}>{inFavorTotal ? inFavorTotal : 0}</Text>
          <Text className={classes.tableSubtext}>Votes in favor</Text>
        </span>
        {renderTableHader()}
        <Table
          className={classes.table}
          height="65vh"
          list={votesInFavor}
          renderCell={value => renderTableCell(value)}
          text="No votes in favor"
        ></Table>
      </span>
      <span className={classes.tableContainer}>
        <span className={classes.tableTextContainer}>
          <Text className={classes.tableText}>{againstTotal ? againstTotal : 0}</Text>
          <Text className={classes.tableSubtext}>Votes against</Text>
        </span>
        {renderTableHader()}
        <Table
          className={classes.table}
          height="65vh"
          list={votesAgainst}
          renderCell={value => renderTableCell(value)}
          text="No votes against"
        ></Table>
      </span>
    </span>
  }

  function renderFooter() {
    let member = getMember()    
    let voted = false
    proposal.votes.forEach(v => {
      if (v.alias == member.alias) {        
        voted = v
      }
    })
    
    if (voted) {
      return <Text className={classes.footerText}>
        You voted: {voted.voteCount} {voted.inFavorOf ? "YES" : "NO"}
      </Text>
    }

    return <span className={classes.buttonContainer}>
      <Button
        gradient
        onClick={async () => {
          await castVote(true)
        }}
        className={classes.viewDetail}
      >
        Vote For
      </Button>
      <Button
        secondary
        onClick={async () => {
          await castVote(false)
        }}
        className={classes.viewDetail}
      >
        Vote Against
      </Button>
    </span>
  }

  if (!proposal) {
    return null
  }

  return (
    <Modal
      className={classes.modal}
      open={selectedProposal ? true : false}
      close={() => {
        close()
        setProposal(false)
      }}
    >
      <span className={classes.header}>
        <Text className={classes.name}>{name}</Text>
        <Text className={classes.category}>{category}</Text>
      </span>
      <Text className={classes.description}>{desc}</Text>
      <span className={classes.info}>
        <span className={classes.infoContainer}>
          <Text className={classes.infoText}>{roundDecimal(proposal.netVotes)}</Text>
          <Text className={classes.infoSubtext}>Votes</Text>
        </span>
        <span className={classes.infoContainer}>
          <Text className={classes.infoText}>{roundDecimal(proposal.netVotesNeeded)}</Text>
          <Text className={classes.infoSubtext}>Votes Needed</Text>
        </span>
        <span className={classes.infoContainer}>
          <Text className={classes.infoText}>{proposal.epoch + proposal.duration}</Text>
          <Text className={classes.infoSubtext}>Until Epoch</Text>
        </span>
      </span>
      <div className={classes.break} />
      {renderTables()}
      {renderFooter()}
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '30px 60px',
    height: '90vh',
    width: '80vw',
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15
  },
  name: {
    fontSize: 25,
    fontWeight: 700
  },
  category: {
    fontSize: 15,
    fontWeight: 700,
    border: `2px solid ${keys.PRIMARY_COLOR}`,
    lineHeight: 2,
    borderRadius: 20,
    padding: '0px 15px'
  },
  description: {
    overflowY: 'auto',
    height: 100,
    marginBottom: 20
  },
  info: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '100%'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 30,
    fontWeight: 500
  },
  infoSubtext: {

  },
  break: {
    width: '100%',
    borderBottom: '0.1px solid white',
    margin: 30,
    opacity: 0.5
  },
  tables: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  tableTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableText: {
    fontSize: 25,
    fontWeight: 700
  },
  tableContainer: {
    marginBottom: 20
  },
  table: {
    maxHeight: 100,
  },
  cell: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: '5px 10px'
  },
  cellText: {

  },
  tableHeaderText: {
    fontWeight: 700
  },
  footer: {

  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
  },
  footerText: {
    fontWeight: 700,
    fontSize: 20,
    border: `2px solid ${keys.PRIMARY_COLOR}`,
    lineHeight: 2,
    borderRadius: 20,
    padding: '0px 15px'
  }
});

export default withStyles(useStyles)(ProposalDetail);