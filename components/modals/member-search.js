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
import { getMembers } from '../../api/get'
import { useStoreApi } from '../../store/provider'

const SearchModal = props => {
  const { classes, title, open, close, action, disabled } = props

  const store = useStoreApi()
  const [members, setMembers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState([])


  useEffect(() => {
    searchMembers(0)
  }, [])

  async function searchMembers(page) {
    let members = await getMembers({params: {
      page
    }})
    setMembers(members)
  }

  function closeSearch() {
    props.close()
    setSelected([])
  }

  function renderCell(cell) {

    let isSelected = selected.includes(cell) || props.selected.includes(cell)

    return <Card onClick={() => {
      if (isSelected) return
      let newSelected = [...selected]
      newSelected.push(cell)
      setSelected(newSelected)
    }} className={clsx(classes.cell, isSelected ? classes.selectedCell : "")}>
      <Avatar member={cell} size={40}></Avatar>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
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