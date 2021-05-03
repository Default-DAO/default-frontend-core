import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { mdiAccountQuestionOutline } from '@mdi/js';

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Form from '../../reusable/form'
import Table from '../../reusable/table'
import Card from '../../reusable/card'
import Avatar from '../../reusable/avatar'
import Button from '../../reusable/button'
import keys from '../../config/keys'
import { useStoreApi } from '../../store/provider'

const SearchModal = props => {
  const { classes, title, open, close, action } = props

  const store = useStoreApi()
  const [users, setUsers] = useState([...keys.DUMMY_USERS])
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState([])

  function renderCell(cell) {
    return <Card onClick={() => {
      let newSelected = [...selected]
      newSelected.push(cell)
      setSelected(newSelected)
    }} className={clsx(classes.cell, selected.includes(cell) ? classes.selectedCell : "")}>
      <Avatar user={cell} size={40}></Avatar>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
    </Card>
  }

  return (
    <Modal className={classes.modal} open={open} close={close}>
      <Text center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
      {/* <Form 
            value={searchText} 
            onChange={searchText => setSearchText(searchText)}
            placeholder="Search users"
          >
          </Form> */}
      <Table
        height="65vh"
        list={users}
        renderCell={value => renderCell(value)}
        text="We couldn't find users"
        subText="Please try again later"
        actionText="Close"
        action={close}
        icon={mdiAccountQuestionOutline}
      ></Table>
      {selected.length > 0 ? <Button
        onClick={() => {
          action(selected)
          store.setShowAddStakeNetwork(false)
          store.setShowAddValueNetwork(false)
        }}
        margin="35px 0px 0px 0px" gradient width={150} height={40}>
        Add users
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
    transition: '0.2s',
    cursor: 'pointer',
    padding: '20px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  selectedCell: {
    opacity: 0.5,
    transform: 'scale(0.95)'
  }
});

export default withStyles(useStyles)(SearchModal);