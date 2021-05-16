import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { mdiAccountQuestionOutline } from '@mdi/js';

import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Table from '../../reusable/table'
import Card from '../../reusable/card'
import { useStoreApi } from '../../store/provider'

const EpochSelector = props => {
  const { getProtocol } = useStoreApi()
  const { classes, title, open, close, action } = props
  const currentEpoch = getProtocol().epochNumber
  let epochs = []
  for (let i = 1; i <= currentEpoch; i++) {
    epochs.push(i)
  }

  function renderCell(cell) {
    return <Card onClick={() => {
      action(cell)
    }} className={classes.cell}>
      <Text margin="0px 0px 0px 15px" fontSize={20}>Epoch {cell}</Text>
    </Card>
  }

  
  return (
    <Modal className={classes.modal} open={open} close={close}>
      <Text center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
      <Table
        height="65vh"
        list={epochs}
        renderCell={value => renderCell(value)}
        text="There are no selectable epochs"
        actionText="Close"
        action={close}
        icon={mdiAccountQuestionOutline}
      ></Table>
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
  }
});

export default withStyles(useStyles)(EpochSelector);