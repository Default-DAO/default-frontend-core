import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { mdiAccountQuestionOutline } from '@mdi/js';
import Icon from '@mdi/react'

import keys from '../../config/keys'
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Table from '../../reusable/table'
import Card from '../../reusable/card'
import Avatar from '../../reusable/avatar'
import Button from '../../reusable/button'
import { getMembers, getProtocol } from '../../api/get'
import { useStoreApi } from '../../store/provider'

const SearchModal = props => {
  const { classes, title, open, close, action, disabled } = props

  const store = useStoreApi()
  const { getMember, setShowProfile, getProtocol } = store
  const [members, setMembers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    searchMembers(0)
  }, [])

  async function searchMembers(skip) {
    let newMembers = await getMembers({
      params: {
        skip,
        excludeEthAddress: getMember().ethAddress
      }
    })
    if (newMembers && newMembers.length) {
      let newTable = skip == 0 ? [...newMembers] : [...members, ...newMembers]
      setMembers(newTable)
    }
  }

  function closeSearch() {
    props.close()
    setSelected([])
  }

  function includes(array, cell) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].ethAddress == cell.ethAddress) return true
    }
    return false
  }

  function handleCellClick(cell) {
    let isSelected = includes(selected, cell) || includes(props.selected, cell)
    if (isSelected) {
      return
    }
    let newSelected = [...selected]
    newSelected.push(cell)
    setSelected(newSelected)
  }

  function handleMemberSearch(e, cell) {
    e.stopPropagation()
    const { ethAddress, alias } = cell
    setShowProfile({
      selectedTab: 1,
      selectedEpoch: getProtocol().epochNumber,
      ethAddress,
      alias
    })
  }

  function renderCell(cell) {
    let isSelected = includes(selected, cell) || includes(props.selected, cell)

    return <Card onClick={() => handleCellClick(cell)} className={clsx(classes.cell, isSelected ? classes.selectedCell : "")}>
      <span className={classes.avatar}>
        <Avatar member={cell} size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
      </span>
      <Icon path={mdiAccountQuestionOutline}
        size={1}
        color={keys.WHITE}
        className={classes.icon}
        onClick={(e) => handleMemberSearch(e, cell)}
      />
    </Card>
  }

  return (
    <Modal className={classes.modal} open={open} close={closeSearch}>
      <Text center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
      {/* <Form 
        value={searchText} 
        onChange={searchText => setSearchText(searchText)}
        placeholder="Search members"
      >
      </Form> */}
      <Table
        height="65vh"
        list={members}
        renderCell={value => renderCell(value)}
        text="We couldn't find members"
        subText="Please try again later"
        actionText="Close"
        action={closeSearch}
        icon={mdiAccountQuestionOutline}
        onScroll={async () => {
          await searchMembers(members.length)
        }}
      ></Table>
      {selected.length > 0 ? <Button
        onClick={() => {
          action(selected)
          closeSearch()
        }}
        margin="35px 0px 0px 0px" gradient width={150} height={40}>
        Add members
            </Button> : null}
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '40px 30px',
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
    padding: '20px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row'
  },
  selectedCell: {
    opacity: 0.5,
    transform: 'scale(0.95)'
  }
});

export default withStyles(useStyles)(SearchModal);