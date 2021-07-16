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
  const { classes, open, close } = props


  return (
    <Modal className={classes.modal} open={open} close={close}>
      <Text center type="paragraph" fontSize={24} fontWeight={600} >Create proposal</Text>
      
      <Form
        value={alias}
        className={classes.form}
        onChange={(text) => {
          setTitle(text)
        }}
        width={280}
        placeholder="Title">
      </Form><br />
      <Form
        value={alias}
        className={classes.form}
        onChange={(text) => {
          setDescription(text)
        }}
        width={280}
        placeholder="Description">
      </Form><br />
      <Form
        value={alias}
        number
        className={classes.form}
        onChange={(text) => {
          setDuration(text)
        }}
        width={280}
        placeholder="Duration">
      </Form><br />
      <Button
        gradient width={300} height={40}
        onClick={async () => {

        }}
      >
        Create
      </Button>
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '40px 30px',
  },

});

export default withStyles(useStyles)(EpochSelector);