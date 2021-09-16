import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { mdiAccountQuestionOutline } from '@mdi/js';
import Icon from '@mdi/react'

import Form from '../../reusable/form'
import keys from '../../config/keys'
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Table from '../../reusable/table'
import Card from '../../reusable/card'
import Avatar from '../../reusable/avatar'
import Button from '../../reusable/button'
import { getMembers, getEpoch } from '../../api/get'
import { useStoreApi } from '../../store/provider'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

const SearchModal = props => {
  const { classes, title, open, close, action, disabled } = props

  const store = useStoreApi()
  const { getMember, setShowProfile, getEpoch } = store
  const [members, setMembers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    searchMembers()
  }, [])

  async function searchMembers(searchText) {
    let newMembers = await getMembers({
      params: {
        searchText,
        excludeEthAddress: getMember().ethAddress
      }
    })
    if (newMembers) {
      setMembers(newMembers)
    }
  }

  function closeSearch() {
    props.close()
    setSelected([])
  }
  
  function handleTextSearch(text) {
    setSearchText(text)
    let timeout = 0
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        searchMembers(text)
    }, 800);
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
      selectedEpoch: getEpoch().epochNumber,
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
      <Form
        width="100%"
        className={classes.form}
        value={searchText}
        onChange={text => {
          handleTextSearch(text)
        }}
        placeholder="Search members"
      >
      </Form>
      <Table
        className={classes.table}
        // height="65vh"
        list={members}
        renderCell={value => renderCell(value)}
        text="We couldn't find members"
        subText="Please try again later"
        actionText="Close"
        action={closeSearch}
        icon={mdiAccountQuestionOutline}
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
    height: '90vh'
  },
  form: {
    padding: "0px 20px",
    height: 70
  },
  table: {
    marginTop: 0
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